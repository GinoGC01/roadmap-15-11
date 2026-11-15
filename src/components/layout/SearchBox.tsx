import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRoadmapSearch } from '../../hooks/useRoadmapSearch'
import type { SearchResult } from '../../server/querys'

const KIND_LABEL: Record<SearchResult['kind'], string> = {
  etapa: 'Etapa',
  semana: 'Semana',
  jornada: 'Jornada',
  recurso: 'Recurso',
}

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = useRoadmapSearch(query)

  return (
    <div className="search">
      <input
        className="input search__input"
        type="search"
        value={query}
        placeholder="Buscar etapa, semana, jornada o recurso…"
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 160)}
        aria-label="Buscar en el roadmap"
      />

      {open && query.trim().length >= 2 ? (
        <div className="search__panel">
          {results.length === 0 ? (
            <p className="faint search__empty">Sin resultados para “{query}”.</p>
          ) : (
            <ul className="search__results">
              {results.map((result) => (
                <li key={`${result.kind}-${result.id}`}>
                  <Link
                    className="search__result"
                    to={result.href}
                    onClick={() => {
                      setOpen(false)
                      setQuery('')
                    }}
                  >
                    <span className="badge badge--muted">{KIND_LABEL[result.kind]}</span>
                    <span className="search__result-body">
                      <strong>{result.title}</strong>
                      <span className="faint">{result.subtitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
