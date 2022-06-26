import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import { Link, useParams } from 'react-router-dom'
import ptBR from 'date-fns/locale/pt-BR'
import classNames from 'classnames'

interface LessonProps {
    title: string
    slug: string
    availableAt: Date
    lessonType: 'live' | 'class'
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt)
    const availableDataFormated = format(props.availableAt, "EEE' • 'd' de 'MMM' • 'k'h'mm", {
        locale: ptBR,
    })

    const isActiceLesson = slug === props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableDataFormated}
            </span>
            <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': isActiceLesson
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={classNames('text-sm font-medium flex items-center gap-2', {
                            'text-white': isActiceLesson,
                            'text-blue-500': !isActiceLesson
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em Breve
                        </span>
                    )}

                    <span className={classNames('text-xs rounded py-[2px] px-2 text-white border font-bold', {
                        'border-white': isActiceLesson,
                        'border-green-300': !isActiceLesson
                    })}>
                        {props.lessonType === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className={classNames('mt-5 block', {
                    'text-white': isActiceLesson,
                    'text-gray-200': !isActiceLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}