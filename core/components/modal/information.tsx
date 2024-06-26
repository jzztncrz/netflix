'use client'

import { useSearchParams } from 'next/navigation'

import { KEY } from '@/core/enums'
import useCustomQuery from '@/core/hook/custom-query'
import get from '@/core/libraries'
import isMovieTrending from '@/core/libraries/isTrending'

import TrendingBadge from '../badges/trending'

const Information = () => {
  const mid = useSearchParams().get('mid') || ''

  const { data: movie } = useCustomQuery({
    queryKey: [KEY.MOVIE, mid],
    queryFn: async () => await get.movie.details({ id: mid }),
    enabled: !!mid,
  })

  const { data: certificate } = useCustomQuery({
    queryKey: [KEY.CERTIFICATE, movie?.id],
    queryFn: async () => await get.movie.certificate({ id: movie?.id || mid }),
    enabled: !!mid,
  })

  const { data: credits } = useCustomQuery({
    queryKey: [KEY.CREDITS, movie?.id],
    queryFn: async () => await get.movie.credits({ id: movie?.id || mid }),
    enabled: !!mid,
  })

  const { isTrending, place } = isMovieTrending({ id: movie?.id || mid })

  const matchPercentage = Math.floor(Math.random() * (100 - 90 + 1) + 90)
  const runtimeHours = (movie?.runtime && Math.floor(movie?.runtime / 60)) || 0
  const runtimeMinutes = (movie?.runtime && movie?.runtime % 60) || 0
  const displayRuntime = (movie?.runtime && runtimeHours > 0 && runtimeMinutes > 0) || false

  if (!movie) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm lg:text-base text-white/80">
        <div className="text-green-500 font-semibold">{matchPercentage}% Match</div>
        {movie.release_date && <span>{movie.release_date.split('-')[0]}</span>}
        {displayRuntime && (
          <span>
            {runtimeHours}h {runtimeMinutes}m
          </span>
        )}
      </div>
      {certificate && <div className="border border-secondary px-2 py-1 w-fit text-sm">{certificate}</div>}
      {isTrending && (
        <div className="flex items-center gap-2 w-fit">
          <TrendingBadge id={movie.id} isNotAbsolute />
          <span className="text-lg lg:text-xl font-semibold tracking-wide">#{place} in Movies Today</span>
        </div>
      )}
      <div className="flex lg:items-center flex-col lg:flex-row lg:justify-between gap-4">
        <p className="w-full max-w-xl">{movie?.overview}</p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          {credits && (
            <div className="flex flex-wrap gap-1">
              <span className="text-secondary lg:text-sm">Cast:</span>
              {credits.slice(0, 4).map((credit) => (
                <span key={credit.id} className="lg:text-sm">
                  {credit.name},
                </span>
              ))}
            </div>
          )}

          {movie?.genres.length && (
            <div className="flex flex-wrap gap-1">
              <span className="text-secondary lg:text-sm">Genres:</span>
              {movie?.genres?.map((genre) => (
                <span key={genre.id} className="lg:text-sm">
                  {genre.name},
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Information
