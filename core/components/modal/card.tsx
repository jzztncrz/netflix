'use client'

import Link from 'next/link'

import { KEY } from '@/core/enums'
import useCustomQuery from '@/core/hook/custom-query'
import get from '@/core/libraries'
import { Movie } from '@/core/types/data'

import Backdrop from '../media/backdrop'
import Poster from '../media/poster'

type Props = { movie: Movie }

const Card = ({ movie }: Props) => {
  const { data: certificate } = useCustomQuery({
    queryKey: [KEY.CERTIFICATE, movie.id],
    queryFn: async () => await get.movie.certificate({ id: movie.id }),
    enabled: !!movie.id,
  })

  const overview = movie.overview.split('.')[0]

  return (
    <>
      <Link href={`?mid=${movie.id}`} className="lg:hidden">
        <div className="w-full h-full">
          <Poster id={movie.id} />
        </div>
      </Link>

      <Link href={`?mid=${movie.id}`} className="hidden lg:block">
        <li className="relative">
          <div className="relative aspect-video">
            <Backdrop id={movie.id} />
          </div>
          <div className="bg-[#2F2F2F] rounded-b-md p-4 flex flex-col gap-3 h-40 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              {certificate && <div className="border border-secondary px-2 py-1 w-fit">{certificate}</div>}
              {movie.release_date && <span>{movie.release_date.split('-')[0]}</span>}
            </div>
            <p>{overview && overview.length > 140 ? overview.slice(0, 140) + '...' : overview}</p>
          </div>
        </li>
      </Link>
    </>
  )
}

export default Card
