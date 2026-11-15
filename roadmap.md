# Roadmap completo: 28 semanas (sin plazo fijo)

**Perfil objetivo:** Full-Stack / Backend Developer con base sólida en Software Engineering y especialización práctica en AI Engineering.
**Ritmo:** 5 jornadas de 2 h 30 (12,5 h/semana) · **Carga total:** 350 h

> **Sobre los links:** se verificaron en búsqueda MIT 18.06, MIT 18.06SC, MIT 6.006, el sitio de 3Blue1Brown y el Machine Learning Crash Course de Google. El resto son páginas oficiales escritas desde conocimiento previo, sin abrirlas una por una. Si alguna ruta profunda cambió, hay que corregirla.

## Cómo es cada jornada (2 h 30)

| Bloque | Tiempo | Qué hacés |
|---|---|---|
| Estudio guiado | 90 min (flexible) | Recurso ancla del día + su práctica. Si la clase no entra, se parte en dos días: el tema lo define la lección, no el reloj |
| Desafío del día | 45 min | Algo chico y fácil de lograr (normalmente 15–30 min reales). El tiempo sobrante es margen |
| Registro | 15 min | Qué entendí, qué me trabó, qué sigue |

## Reglas

- Mínimo 3 jornadas por semana si no llegás a las 5.
- No avanzás de semana sin terminar el entregable del viernes.
- Si una evaluación de etapa no sale, repetís la semana (tu colchón personal).
- Si hay que recortar, se protege LLMs/RAG/agentes y el proyecto.
- Escribí el `README.md` de cada entregable **antes** que el código (qué problema resuelve y qué vas a hacer) y completalo al final con "qué aprendí y qué falló".

## Hilos transversales

- **SQL:** jueves, dentro del desafío. Básico (sem 1-4) → modelado (5-8) → índices y `EXPLAIN` (9-12) → pgvector/JSONB/full-text (13-16) → transacciones y migraciones (17-20) → RDS y tuning (21-24).
- **Testing:** unitarios desde la sem 5, integración desde la sem 9, contract tests en la 20.
- **Proyecto B2B AI Knowledge Platform:** v0 en las sem 9-10 y crece en cada etapa.
- **Redes:** *núcleo* (IP, puertos, DNS, TCP, HTTP/TLS) con práctica real; *para entender* (subnetting, Packet Tracer) con concepto y una práctica.

## Etapas

| Etapa | Semanas | Resultado |
|---|---|---|
| 1. Fundamentos matemáticos y algorítmicos | 1–4 | Álgebra lineal, cálculo, estadística |
| 2. Algoritmos, redes y Linux | 5–8 | Resolución de problemas y sistemas |
| 3. Machine Learning y Deep Learning | 9–12 | Modelos, entrenamiento, evaluación |
| 4. LLMs, RAG y agentes | 13–16 | IA evaluable y confiable |
| 5. Cloud, Docker y arquitectura | 17–20 | Apps modulares y contenerizadas |
| 6. AWS, DevOps y observabilidad | 21–24 | Despliegue, seguridad, operación |
| 7. Consolidación y empleabilidad | 25–28 | Producto defendible |

## Biblioteca base (cursos largos; en las tablas "L" = número de clase)

| Recurso | Link | Qué es |
|---|---|---|
| MIT 18.06 (Strang) | [Videos](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/video_galleries/video-lectures/) · [Versión SC con problemas resueltos](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/) | Solo las clases indicadas por semana; el resto es opcional para la facultad |
| MIT 6.006 (Ku/Demaine) | [Videos](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/video_galleries/lecture-videos) | Idem |
| 3Blue1Brown | [Álgebra lineal](https://www.3blue1brown.com/topics/linear-algebra) · [Cálculo](https://www.3blue1brown.com/topics/calculus) · [Redes neuronales](https://www.3blue1brown.com/topics/neural-networks) | Cap = capítulo |
| Google MLCC | [Crash Course](https://developers.google.com/machine-learning/crash-course) | Con ejercicios en Colab |
| Práctica de algoritmos | [LeetCode](https://leetcode.com/problemset/) · [NeetCode roadmap](https://neetcode.io/roadmap) · [HackerRank](https://www.hackerrank.com/domains/algorithms) · [VisuAlgo](https://visualgo.net/en) | Problemas por nombre |

---

# ETAPA 1: Fundamentos matemáticos y algorítmicos (sem 1–4)

Los algoritmos de esta etapa se hacen en Python.

## Semana 1: Álgebra lineal I

| Día | Recurso ancla | Práctica (de dónde sale) | Desafío |
|---|---|---|---|
| Lun | [6.006 L1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-1-algorithms-and-computation/) | LeetCode: Contains Duplicate, Valid Anagram, Valid Palindrome | Anotar complejidad de tiempo y espacio de cada una |
| Mar | 3b1b LA cap 1, 2 y 9 + [18.06 L1](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-1-the-geometry-of-linear-equations) | Implementar suma, producto escalar y norma en Python; comparar con [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html) | Producto escalar de 2 vectores a mano y verificarlo en código |
| Mié | 3b1b LA cap 3 y 4 + 18.06 L3 | Multiplicar matrices 2x2 y 2x3 a mano y con NumPy | Explicar en 3 frases por qué (2x3)·(3x2) funciona y (2x3)·(2x3) no |
| Jue | 18.06 L2 + [SQLBolt](https://sqlbolt.com/) lecciones 1–5 | Eliminación de Gauss en un sistema 3x3; comparar con [`numpy.linalg.solve`](https://numpy.org/doc/stable/reference/routines.linalg.html) | **SQL:** 3 consultas SELECT/WHERE/ORDER BY en SQLBolt |
| Vie | 3b1b LA cap 2 + 18.06 L9 | Repo `linear-algebra-lab` con [pytest](https://docs.pytest.org/en/stable/getting-started.html) | Agregar 1 test por función |

**Objetivo:** dominar vectores y matrices como herramienta: operar con ellos, resolver sistemas y entender por qué las dimensiones importan. Es el lenguaje de embeddings, redes neuronales y datos.

**Entregable: `linear-algebra-lab`**
- **Por qué:** implementar a mano lo que NumPy hace en una línea es lo que separa "usar" de "entender".
- **Impacto:** cuando después veas un `matmul` en PyTorch o un error de shapes, sabrás qué pasó.
- **Qué refleja:** que sabés traducir una idea matemática a código verificado con tests.

**Guía de armado**
1. Creá el repo y un entorno virtual. Escribí `README.md` con objetivo y lista de funciones a implementar.
2. `src/vectors.py`: suma, producto escalar, norma y distancia. Un test por función en `tests/test_vectors.py`.
3. `src/matrices.py`: multiplicación y transposición, con validación de dimensiones. Test de un caso que debe fallar.
4. `src/solver.py`: eliminación de Gauss. Test que compare el resultado con `numpy.linalg.solve`.
5. `examples.ipynb`: un ejemplo corto de cada función.
6. Cerrá el README con la explicación de por qué la multiplicación exige dimensiones compatibles.

## Semana 2: Álgebra lineal II

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | 6.006 L4 (Hashing) | LeetCode: Two Sum, Intersection of Two Arrays, Happy Number | Justificar por qué Two Sum con hash es O(n) |
| Mar | 18.06 L6 + 3b1b LA cap 16 | Calcular rango y espacio nulo con NumPy | Decidir si 3 vectores dados son independientes |
| Mié | 3b1b LA cap 13 + 18.06 L15 y L31 | Rotación 2D y proyección sobre una recta, graficadas con [Matplotlib](https://matplotlib.org/stable/tutorials/index.html) | Rotar un vector 90° y verificar el resultado |
| Jue | 18.06 L18–19 + SQLBolt lecciones 6–7 | `det`, `inv` y rango con NumPy | **SQL:** 2 consultas con JOIN |
| Vie | 18.06 L21 y L30 + 3b1b LA cap 14 | Aplicar PCA/SVD simple a un dataset chico con NumPy | Dibujar los autovectores de una matriz 2x2 |

**Objetivo:** entender las transformaciones lineales, los espacios vectoriales y la descomposición (autovalores, SVD). Es la base de la reducción dimensional y de cómo se representan los datos.

**Entregable: `transformations-lab`**
- **Por qué:** ver una matriz como "algo que mueve el espacio" cambia cómo leés cualquier modelo.
- **Impacto:** PCA y SVD aparecen en compresión de embeddings y análisis de datos.
- **Qué refleja:** comprensión geométrica, no solo cálculo.

**Guía de armado**
1. README con las 3 preguntas que querés responder (por ejemplo: ¿qué hace una rotación? ¿qué es una proyección?).
2. `notebooks/01_transformaciones.ipynb`: rotación y proyección 2D con gráficos antes y después.
3. `notebooks/02_autovectores.ipynb`: una matriz 2x2, sus autovectores dibujados y una explicación en texto.
4. `notebooks/03_svd.ipynb`: aplicá SVD a un dataset chico y mostrá la reconstrucción con menos componentes.
5. Cerrá el README con el ejemplo geométrico de autovectores.

## Semana 3: Cálculo y optimización

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Khan: Algoritmos (recursividad)](https://www.khanacademy.org/computing/computer-science/algorithms) | LeetCode: Fibonacci Number, Climbing Stairs, Reverse String | Identificar el caso base de cada una |
| Mar | [Khan: Cálculo diferencial](https://www.khanacademy.org/math/differential-calculus) + [3b1b Cálculo](https://www.3blue1brown.com/topics/calculus) (esencia, derivadas) | Ejercicios de Khan | Derivar 3 funciones a mano |
| Mié | [Khan: Cálculo multivariable (derivadas parciales y gradiente)](https://www.khanacademy.org/math/multivariable-calculus) | Ejercicios de Khan | Calcular el gradiente de f(x,y) = x² + y² |
| Jue | 3b1b Cálculo (regla de la cadena) + [MLCC](https://developers.google.com/machine-learning/crash-course) (Linear regression → Loss) + SQLBolt lecciones 8–11 | Calcular MSE a mano para 3 puntos | **SQL:** 1 consulta con COUNT/AVG y GROUP BY |
| Vie | MLCC (Linear regression → Gradient descent) | Implementar gradient descent en Python y graficar | Probar 3 learning rates |

**Objetivo:** entender cómo un modelo "aprende": derivadas, gradientes y descenso por gradiente.

**Entregable: `gradient-descent-lab`**
- **Por qué:** todo el entrenamiento de ML es optimización. Esta es la versión mínima del mecanismo.
- **Impacto:** vas a interpretar curvas de loss y elegir learning rates con criterio.
- **Qué refleja:** que comprendés el motor del aprendizaje, no solo la API.

**Guía de armado**
1. README con la función a minimizar y qué vas a comparar.
2. `src/gradient.py`: gradiente analítico y numérico. Test que verifique que coinciden con tolerancia.
3. `src/descent.py`: gradient descent con learning rate configurable.
4. `notebooks/experiments.ipynb`: 3 learning rates (chico, adecuado, grande) con gráfico de convergencia.
5. README final con una conclusión sobre qué pasa con cada learning rate.

## Semana 4: Probabilidad, estadística y Python para datos

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | Khan Algoritmos (búsqueda binaria, ordenamiento) | LeetCode: Binary Search, Search Insert Position, Merge Sorted Array | Escribir la complejidad de cada una |
| Mar | [Khan: Estadística y probabilidad](https://www.khanacademy.org/math/statistics-probability) (condicional y Bayes) | Ejercicios de Khan | Resolver 1 problema tipo "test médico" con Bayes |
| Mié | Khan (distribuciones) + [NumPy random](https://numpy.org/doc/stable/reference/random/index.html) | Simular 1000 lanzamientos de moneda y una normal | Graficar un histograma |
| Jue | [OpenStax Intro Statistics](https://openstax.org/details/books/introductory-statistics-2e) (media, varianza, covarianza) + [sqlite3 en Python](https://docs.python.org/3/library/sqlite3.html) | Cargar un CSV en SQLite y consultarlo desde [pandas](https://pandas.pydata.org/docs/user_guide/10min.html) | **SQL:** 1 consulta desde pandas |
| Vie | [Kaggle Learn: Pandas](https://www.kaggle.com/learn/pandas) + [CS50P](https://cs50.harvard.edu/python/) (repaso) | EDA de un dataset de [Kaggle](https://www.kaggle.com/datasets) | Encontrar 1 valor atípico |

**Objetivo:** leer datos con criterio: probabilidad, distribuciones, medidas y exploración, para evaluar modelos después.

**Entregable: `stats-analysis`**
- **Por qué:** sin estadística no se pueden interpretar métricas ni detectar datos engañosos.
- **Impacto:** es la base de la evaluación de modelos (semanas 9-16).
- **Qué refleja:** que sabés analizar un dataset de forma reproducible.

**Guía de armado**
1. `data/` con el dataset y su fuente anotada en el README.
2. `requirements.txt` para que otra persona pueda reproducirlo.
3. `notebooks/01_eda.ipynb`: estructura, nulos y estadísticas descriptivas.
4. Sección de simulación de una distribución y una de valores atípicos.
5. Cierre con "hallazgos" (3 puntos) y la diferencia entre correlación y causalidad con un ejemplo de tus datos.

**Evaluación de etapa:** algoritmos sin IA, explicar álgebra, derivadas y estadística, y defender los 4 entregables sin mirar el código.

---

# ETAPA 2: Algoritmos, redes y Linux (sem 5–8)

Desde acá los algoritmos van en TypeScript, con [Vitest](https://vitest.dev/guide/) para los tests ([TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) como referencia).

## Semana 5: Técnicas algorítmicas

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [NeetCode: Two Pointers](https://neetcode.io/roadmap) | Setup del repo con Vitest; Valid Palindrome, Two Sum II, Move Zeroes | 1 test por problema |
| Mar | NeetCode: Sliding Window | Best Time to Buy and Sell Stock, Maximum Average Subarray I | Un caso límite (array vacío) |
| Mié | 6.006 L3 + [VisuAlgo sorting](https://visualgo.net/en/sorting) | Implementar insertion y merge sort | Comparar sus tiempos con 1000 elementos |
| Jue | NeetCode: Binary Search + [PostgreSQL: constraints y claves](https://www.postgresql.org/docs/current/ddl-constraints.html) | LeetCode: Binary Search, Sqrt(x) | **SQL:** crear 2 tablas con PRIMARY KEY y FOREIGN KEY |
| Vie | LeetCode | 5 problemas easy | Elegir 1 y escribir una solución alternativa |

**Objetivo:** reconocer patrones (two pointers, sliding window, sorting, búsqueda binaria) y elegir la solución con criterio de complejidad.

**Entregable: `algorithm-patterns`**
- **Por qué:** los patrones se repiten en entrevistas y en problemas reales de rendimiento.
- **Impacto:** velocidad para resolver problemas y justificar decisiones.
- **Qué refleja:** pensamiento algorítmico y disciplina de testing (primer repo con tests obligatorios).

**Guía de armado**
1. Repo TypeScript con Vitest configurado y un test de ejemplo que pase.
2. Una carpeta por patrón: `src/twoPointers/`, `src/slidingWindow/`, `src/sorting/`, `src/binarySearch/`.
3. Por cada problema: `solucion.ts` y `solucion.test.ts` con caso normal, vacío y límite.
4. `ANALYSIS.md`: tabla con problema, patrón, complejidad de tiempo y espacio.
5. Elegí un problema y documentá dos soluciones comparadas.

## Semana 6: Estructuras de datos y grafos

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [VisuAlgo list/stack/queue](https://visualgo.net/en/list) | Implementar stack y queue; Valid Parentheses | Test con entrada vacía |
| Mar | VisuAlgo list | Implementar linked list; Reverse Linked List | Dibujar los punteros antes y después |
| Mié | 6.006 L6 (árboles binarios) + [VisuAlgo BST](https://visualgo.net/en/bst) | Maximum Depth of Binary Tree, Invert Binary Tree | Escribir el recorrido inorder de un árbol chico |
| Jue | 6.006 L9–10 (BFS y DFS) + [VisuAlgo grafos](https://visualgo.net/en/graphds) + [Normalización](https://en.wikipedia.org/wiki/Database_normalization) | Implementar BFS y DFS | **SQL:** llevar una tabla repetitiva a 1FN/2FN |
| Vie | LeetCode: Course Schedule | Motor de dependencias entre tareas con detección de ciclos | Test con un ciclo |

**Objetivo:** implementar las estructuras básicas y usar grafos para modelar dependencias.

**Entregable: `task-dependency-engine`**
- **Por qué:** un orden de ejecución con detección de ciclos aparece en builds, pipelines y migraciones.
- **Impacto:** primer componente con lógica real que podrías reutilizar.
- **Qué refleja:** capacidad de pasar de estructura de datos a un caso de uso.

**Guía de armado**
1. README con el problema: "dadas tareas y dependencias, devolver un orden válido o informar un ciclo".
2. `src/graph.ts`: grafo dirigido (agregar nodo y arista).
3. `src/detectCycle.ts` y `src/executionOrder.ts` (orden topológico).
4. Tests: sin dependencias, cadena, duplicados y ciclo.
5. README final con la complejidad de BFS/DFS y un ejemplo de uso.

## Semana 7: Redes y protocolos

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Cisco Networking Basics](https://www.netacad.com/courses/networking-basics) + [Cloudflare: OSI](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) | Tabla: capa, qué hace, ejemplo | Explicar en 2 frases para qué existen las capas |
| Mar | Cloudflare: [subnet](https://www.cloudflare.com/learning/network-layer/what-is-a-subnet/) y [NAT](https://www.cloudflare.com/learning/network-layer/what-is-nat/) *(núcleo: IP, máscara, gateway; el resto, concepto)* | 5 ejercicios en [Subnetting Practice](https://www.subnettingpractice.com/) | Decir cuántos hosts tiene una /24 |
| Mié | Cloudflare: [TCP/IP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/) + [Packet Tracer](https://www.netacad.com/cisco-packet-tracer) | 1 laboratorio con 2 redes y un router | Anotar los puertos de HTTP, HTTPS, SSH y DNS |
| Jue | [Cloudflare: DNS](https://www.cloudflare.com/learning/dns/what-is-dns/) + [TLS](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) + [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) + [Constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) | `dig` y `curl -v` a un sitio | **SQL:** agregar un CHECK y un UNIQUE |
| Vie | [Wireshark User Guide](https://www.wireshark.org/docs/wsug_html_chunked/) + [capturas de ejemplo](https://wiki.wireshark.org/SampleCaptures) | Capturar una request HTTP y una HTTPS | Identificar el handshake en la captura |

**Objetivo:** entender el camino de una request (IP, puertos, DNS, TCP, HTTP/TLS) y diagnosticar fallas.

**Entregable: informe de diagnóstico de red**
- **Por qué:** casi toda falla de producción "no responde" empieza en red.
- **Impacto:** reducís horas de prueba y error cuando algo no conecta.
- **Qué refleja:** que sabés razonar capa por capa.

**Guía de armado**
1. Carpeta `network-report/` con `REPORT.md` y `captures/`.
2. Capturá una request HTTP y otra HTTPS con Wireshark y guardalas.
3. En el informe: ciclo de la request (DNS → TCP → TLS → HTTP) con evidencia de la captura.
4. Provocá un fallo (puerto cerrado o DNS roto) y documentá síntoma, hipótesis, prueba y causa.
5. Agregá un diagrama de la red de Packet Tracer.

## Semana 8: Linux y servidores

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Linux Journey](https://linuxjourney.com/) (archivos, permisos, usuarios) | [OverTheWire Bandit](https://overthewire.org/wargames/bandit/) niveles 0–5 | `chmod` sobre un archivo de prueba |
| Mar | Linux Journey (procesos, servicios) + [LFS101](https://training.linuxfoundation.org/training/introduction-to-linux/) | `ps`, `top`, `systemctl status` | Listar los 3 procesos que más memoria usan |
| Mié | Linux Journey (Text Fu) + [Bash manual](https://www.gnu.org/software/bash/manual/) | Script de backup | Ejecutarlo una vez y verificar el archivo |
| Jue | [Setup inicial de servidor Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu) + [Nginx guide](https://nginx.org/en/docs/beginners_guide.html) + [PostgreSQL en Ubuntu](https://www.postgresql.org/download/linux/ubuntu/) | SSH con clave, firewall (ufw), Nginx | **SQL:** instalar PostgreSQL y crear una DB |
| Vie | [Ubuntu Server docs](https://documentation.ubuntu.com/server/) | Servidor Ubuntu (VM local o VPS barato) con una API desplegada | Escribir el README operativo |

**Objetivo:** operar un servidor: usuarios, permisos, procesos, SSH, firewall, Nginx y logs.

**Entregable: servidor documentado con API desplegada**
- **Por qué:** desplegar y operar es parte de ser backend developer.
- **Impacto:** tu proyecto vive en un servidor propio desde ahora.
- **Qué refleja:** autonomía operativa.

**Guía de armado**
1. `docs/RUNBOOK.md` con secciones: acceso, usuarios, firewall, servicios y logs.
2. Configurá usuario, SSH con clave y `ufw`; anotá cada comando.
3. `scripts/backup.sh` y una prueba de que funciona.
4. Desplegá la API detrás de Nginx; guardá una copia de la config en `config/nginx/`.
5. Agregá una sección "si la API no responde, revisá esto" con el orden de diagnóstico.

**Evaluación de etapa:** simulá la falla de una API ("no responde") y explicá en voz alta tu diagnóstico: red, DNS, firewall, procesos, puertos y logs.

---

# ETAPA 3: Machine Learning y Deep Learning (sem 9–12)

## Semana 9: Introducción a ML + Proyecto v0 (parte 1)

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Kaggle: Intro to ML](https://www.kaggle.com/learn/intro-to-machine-learning) | Ejercicios de Kaggle | Definir features y label de un dataset |
| Mar | MLCC (Linear regression) | Colab del módulo | Explicar qué es la función de pérdida en 3 frases |
| Mié | [scikit-learn: Getting Started](https://scikit-learn.org/stable/getting_started.html) | Preparar un dataset | Separar train y test |
| Jue | [Prisma Quickstart](https://www.prisma.io/docs/getting-started) + [Express](https://expressjs.com/en/starter/installing.html) + [Use The Index, Luke](https://use-the-index-luke.com/) | **Proyecto v0:** API con CRUD y PostgreSQL, desplegada en tu servidor | **SQL:** crear un índice y verificar que existe |
| Vie | Kaggle Intro to ML | Entrenar una regresión; MAE y RMSE | Escribir 2 limitaciones del modelo |

**Objetivo:** entrenar y medir un primer modelo de regresión, y arrancar la plataforma que va a crecer hasta el final.

**Entregables: `ml-regression` y `platform-api` (v0)**
- **Por qué:** un modelo sin métricas y limitaciones es una opinión. El proyecto es la columna vertebral del programa.
- **Impacto:** el proyecto evita que cada etapa sea un ejercicio suelto.
- **Qué refleja:** criterio de ingeniería (medir) y continuidad.

**Guía de armado**
1. `ml-regression`: notebook con dataset, features y label descritos.
2. Separá train/test, entrená y calculá MAE y RMSE.
3. `LIMITATIONS.md` con 3 limitaciones concretas.
4. `platform-api`: README con alcance del v0 (usuarios y documentos).
5. Esquema Prisma, endpoints CRUD y conexión a PostgreSQL.
6. Desplegalo en tu servidor y anotá cómo en el README.

## Semana 10: Clasificación y evaluación + Proyecto v0 (parte 2)

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | MLCC (Logistic regression) | Colab del módulo | Explicar qué devuelve la sigmoide |
| Mar | MLCC (Classification) + [scikit-learn: model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) | Matriz de confusión de un clasificador | Calcular precision y recall con 4 números |
| Mié | Kaggle Intro to ML (árboles y Random Forest) | Ejercicios de Kaggle | Entrenar un Random Forest |
| Jue | [Kaggle: Intermediate ML](https://www.kaggle.com/learn/intermediate-machine-learning) (data leakage) + [JWT/auth: OWASP cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) + [`EXPLAIN`](https://www.postgresql.org/docs/current/using-explain.html) | **Proyecto v0:** auth + tests con [Supertest](https://github.com/ladjs/supertest) | **SQL:** ejecutar `EXPLAIN` en una consulta |
| Vie | MLCC (Datasets, generalization, overfitting) | Comparar 2 clasificadores | Señalar 1 posible fuga de datos |

**Objetivo:** elegir la métrica según el problema y detectar errores de evaluación (overfitting y fuga de datos).

**Entregable: informe comparativo de clasificadores**
- **Por qué:** accuracy sola engaña. Elegir mal la métrica rompe el producto.
- **Impacto:** lo vas a usar para evaluar el RAG y el agente.
- **Qué refleja:** pensamiento crítico sobre resultados.

**Guía de armado**
1. `REPORT.md` con el problema y por qué importa cada tipo de error.
2. Entrená dos clasificadores (regresión logística y Random Forest).
3. Tabla comparativa: precision, recall y F1, más la matriz de confusión.
4. Sección "posible fuga de datos" con un ejemplo, real o simulado.
5. Conclusión: qué modelo elegirías y por qué.
6. En el proyecto: agregá autenticación y tests de integración.

## Semana 11: Redes neuronales y backpropagation

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [3b1b NN](https://www.3blue1brown.com/topics/neural-networks) cap 1 | Dibujar un perceptrón | Nombrar sus partes: pesos, bias, activación |
| Mar | 3b1b NN cap 1 + MLCC (Neural networks) | Forward pass a mano de una red 2-2-1 | Verificar el resultado en código |
| Mié | 3b1b NN cap 2 (gradient descent) | Gradient descent con una función de pérdida simple | Anotar cómo cambia el loss en 5 pasos |
| Jue | **Backprop en 3 pasos:** (1) 3b1b NN cap 3–4; (2) una neurona en papel con regla de la cadena; (3) [Karpathy: micrograd](https://www.youtube.com/watch?v=VMj-3S1tku0). Además [`EXPLAIN` / query plans](https://www.postgresql.org/docs/current/using-explain.html) | Paso 2 en papel, paso 3 en código | **SQL:** leer un plan y decir si usa índice |
| Vie | Karpathy (continuación) | Red pequeña con learning rates y batch size distintos | Comparar 2 learning rates |

**Objetivo:** entender cómo se calculan los gradientes y se actualizan los pesos.

**Entregable: `nn-from-scratch`**
- **Por qué:** backprop es la idea central del deep learning. Entenderla a mano evita tratar PyTorch como caja negra.
- **Impacto:** depurar entrenamientos y leer papers con menos esfuerzo.
- **Qué refleja:** profundidad conceptual.

**Guía de armado**
1. `docs/backprop-manual.md` (o foto/PDF): una neurona, forward, loss, derivadas con regla de la cadena y actualización de pesos.
2. `src/network.py`: red 2-2-1 con forward pass.
3. Agregá backward y actualización de pesos.
4. Test: tu gradiente coincide con uno numérico.
5. Experimentos con 2 learning rates y gráfico del loss.
6. README: arquitectura dibujada y el paso a paso del cálculo manual.

## Semana 12: Deep Learning con PyTorch

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [PyTorch: Learn the Basics](https://pytorch.org/tutorials/beginner/basics/intro.html) (tensores, datasets) | Notebook del tutorial | Crear un tensor 3x3 |
| Mar | Learn the Basics (build model) | Notebook | Definir un modelo con `nn.Module` |
| Mié | Learn the Basics (autograd, optimización) | Notebook | Calcular un gradiente con `backward()` |
| Jue | Learn the Basics (guardar y cargar) + [Kaggle: Intro to Deep Learning](https://www.kaggle.com/learn/intro-to-deep-learning) | **Proyecto:** endpoint que guarda predicciones para evaluar | **SQL:** reescribir una consulta lenta con un índice |
| Vie | PyTorch tutorials | Clasificador con loss y métricas registradas | Guardar y recargar el modelo |

**Objetivo:** entrenar, validar, guardar y reproducir un modelo.

**Entregable: `pytorch-classifier`**
- **Por qué:** reproducibilidad es lo que separa un experimento de una demo.
- **Impacto:** otra persona (o vos en 6 meses) puede repetir el resultado.
- **Qué refleja:** práctica de ingeniería de ML.

**Guía de armado**
1. `config.yaml` con hiperparámetros y semilla.
2. `train.py`: entrenamiento con registro de loss y métricas.
3. `evaluate.py`: carga el modelo guardado y evalúa.
4. Carpeta `models/` con el modelo y `results/` con curvas.
5. README con los comandos exactos para reproducir.
6. Análisis de 5 errores del modelo.

**Evaluación de etapa:** explicar entrenamiento vs inferencia, detectar overfitting, elegir métricas y reproducir tu experimento desde un clon limpio del repo.

---

# ETAPA 4: LLMs, RAG y agentes (sem 13–16)

## Semana 13: NLP, embeddings y Transformers

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [HF LLM Course](https://huggingface.co/learn/llm-course) (tokenizers) | Tokenizar 3 frases | Contar tokens de un texto |
| Mar | [Sentence Transformers](https://www.sbert.net/) | Generar embeddings y similitud coseno | Comparar 2 frases parecidas y 1 distinta |
| Mié | [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) | Resumir self-attention con un diagrama propio | Explicar Q, K y V en 3 frases |
| Jue | 3b1b NN (capítulos de transformers y attention) + [pgvector](https://github.com/pgvector/pgvector) | Instalar pgvector | **SQL:** guardar 3 vectores y consultar el más cercano |
| Vie | HF LLM Course | Laboratorio de embeddings con textos propios | Anotar 1 caso donde falla |

**Objetivo:** entender cómo se representa el texto y cómo se mide similitud.

**Entregable: `embeddings-lab`**
- **Por qué:** los embeddings son la base del retrieval.
- **Impacto:** vas a elegir y evaluar modelos de embeddings con datos, no por intuición.
- **Qué refleja:** que evaluás en vez de asumir.

**Guía de armado**
1. `data/texts.json` con 20 textos propios (8 de dos temas y algunos ambiguos).
2. `embed.py`: genera embeddings y los guarda.
3. `similarity.py`: coseno y top-3 para cada consulta.
4. `eval.md`: 10 consultas con la respuesta esperada y si acertó.
5. Anotá 2 casos donde falla y una hipótesis.

## Semana 14: LLMs e inferencia

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | HF LLM Course (generación) | Generar texto con un modelo chico | Cambiar el prompt y comparar |
| Mar | [How to generate text (HF)](https://huggingface.co/blog/how-to-generate) | Probar temperature y top-p | Anotar el efecto de cada uno |
| Mié | [OpenAI: Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering) + [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) + [Anthropic: Prompt Engineering](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview) | Pedir una salida JSON | Validarla con [Zod](https://zod.dev/) |
| Jue | [HF Transformers: cuantización](https://huggingface.co/docs/transformers) (sección Quantization) + [PostgreSQL JSON](https://www.postgresql.org/docs/current/datatype-json.html) | Estimar costo por 1000 requests | **SQL:** guardar un JSONB y consultarlo |
| Vie | OpenAI Docs | Endpoint de generación con validación y latencia; integrarlo al proyecto | Medir la latencia de 5 llamadas |

**Objetivo:** consumir un LLM como un servicio confiable: salida validada, errores y costos medidos.

**Entregable: servicio de generación**
- **Por qué:** una llamada a un LLM sin validación ni límites no sirve para producción.
- **Impacto:** esta capa se reutiliza en RAG y agentes.
- **Qué refleja:** ingeniería defensiva.

**Guía de armado**
1. README con endpoints y formato de respuesta.
2. Esquema Zod de la salida esperada.
3. Manejo de errores: timeout, respuesta inválida y reintento limitado.
4. Métricas por request: latencia, tokens y costo estimado.
5. Tests con respuestas simuladas.
6. Integrarlo en `platform-api`.

## Semana 15: RAG

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [LlamaIndex docs](https://docs.llamaindex.ai/en/stable/) (conceptos de RAG) | Dibujar el flujo RAG | Elegir un tamaño de chunk y justificarlo |
| Mar | pgvector README | Crear un índice vectorial | Comparar la búsqueda con y sin índice |
| Mié | pgvector (filtros y metadata) | Búsqueda con filtro por metadata | Probar top-k = 3 y 5 |
| Jue | [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html) + [Ragas](https://docs.ragas.io/) | Búsqueda híbrida simple | **SQL:** una consulta con `to_tsvector` |
| Vie | LlamaIndex + Ragas | RAG sobre documentos, con 10 preguntas esperadas; integrarlo al proyecto | Medir cuántas respuestas recuperan el chunk correcto |

**Objetivo:** construir una cadena ingesta → retrieval → respuesta con citas, y medirla.

**Entregable: RAG con PostgreSQL/pgvector y evaluación**
- **Por qué:** es el núcleo del producto final.
- **Impacto:** definís la calidad base contra la que vas a mejorar.
- **Qué refleja:** AI Engineering aplicado y medido.

**Guía de armado**
1. `schema.sql`: tablas de documentos, chunks y embeddings.
2. `ingest.ts`: lee documentos, hace chunking y guarda embeddings.
3. `search.ts`: top-k con filtro por metadata.
4. `eval/questions.json`: 10 preguntas con el documento esperado.
5. `eval/run.ts`: calcula cuántas veces recupera el chunk correcto.
6. `REPORT.md`: resultados, errores y qué cambiarías.

## Semana 16: Agentes y evaluación

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) + [HF Agents Course](https://huggingface.co/learn/agents-course) | Diagrama de un workflow vs un agente | Decir cuándo no hace falta un agente |
| Mar | [Tool use (Anthropic)](https://docs.claude.com/en/agents-and-tools/tool-use/overview) | Definir 1 tool con esquema | Rechazar una llamada con argumentos inválidos |
| Mié | [LangGraph Academy](https://academy.langchain.com/courses/intro-to-langgraph) | Guardar el estado del agente | Reanudar una sesión |
| Jue | [OWASP Top 10 for LLM Apps](https://genai.owasp.org/llm-top-10/) | Lista de riesgos de tu agente | **SQL:** tabla de sesiones y mensajes |
| Vie | HF Agents Course | Agente con documentos y 1 tool con permisos explícitos | Probar 1 acción no autorizada |

**Objetivo:** que un agente use herramientas con permisos explícitos y estado persistente.

**Entregable: agente con tools, estado, permisos y evaluación**
- **Por qué:** un agente sin permisos es un riesgo de seguridad.
- **Impacto:** habilita acciones sobre datos reales sin perder control.
- **Qué refleja:** seguridad y confiabilidad en IA.

**Guía de armado**
1. `docs/permissions.md`: qué tool puede hacer qué y quién la autoriza.
2. `tools/`: una tool de lectura y una de acción, con esquema validado.
3. Tabla de sesiones y mensajes en PostgreSQL.
4. `evals/unauthorized.test.ts`: casos donde el agente debe negarse.
5. Registro de cada llamada a tool (trazabilidad).
6. README con una conversación de ejemplo.

**Evaluación de etapa:** dataset de evaluación, métricas de retrieval, groundedness, latencia, costo y pruebas de acciones no autorizadas.

---

# ETAPA 5: Cloud agnóstico, Docker y arquitectura (sem 17–20)

## Semana 17: Fundamentos de Cloud

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final) | Tabla IaaS/PaaS/SaaS con ejemplos | Clasificar 3 servicios que conozcas |
| Mar | [AWS Cloud Practitioner Essentials](https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials) (módulos iniciales) | Notas | Explicar región vs zona de disponibilidad |
| Mié | [Microsoft: conceptos cloud](https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/) | Notas | Listar compute, storage y red de tu proyecto |
| Jue | AWS (responsabilidad compartida) + [PostgreSQL: transacciones](https://www.postgresql.org/docs/current/tutorial-transactions.html) | Transferencia entre dos cuentas con `BEGIN`/`COMMIT` | **SQL:** probar un `ROLLBACK` |
| Vie | [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/) + [Pricing Calculator](https://calculator.aws/) | Diagrama de la SaaS B2B | Marcar 1 punto único de fallo |

**Objetivo:** pensar infraestructura (disponibilidad, costos, riesgos) sin depender de un proveedor.

**Entregable: `cloud-design.md`**
- **Por qué:** diseñar antes de desplegar evita errores caros.
- **Impacto:** base para la migración a AWS.
- **Qué refleja:** pensamiento de arquitecto.

**Guía de armado**
1. Contexto: qué es la SaaS B2B y quién la usa.
2. Diagrama de componentes (app, DB, storage, colas).
3. Tabla de dependencias y puntos únicos de fallo.
4. Estimación de costo con supuestos explícitos.
5. Riesgos y mitigaciones (3 como mínimo).

## Semana 18: Docker

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Docker Get Started](https://docs.docker.com/get-started/) | Primer contenedor | Correr `hello-world` |
| Mar | [Docker Node.js guide](https://docs.docker.com/guides/nodejs/) + [Multi-stage](https://docs.docker.com/build/building/multi-stage/) | Dockerfile de tu API | Comparar el tamaño de la imagen |
| Mié | [Docker Storage](https://docs.docker.com/engine/storage/) | Volumen para Postgres | Reiniciar y verificar que los datos siguen |
| Jue | [Docker Networking](https://docs.docker.com/engine/network/) + [Isolation levels](https://www.postgresql.org/docs/current/transaction-iso.html) | API y DB en la misma red | **SQL:** leer los niveles de aislamiento y anotar 1 anomalía |
| Vie | Guía Docker Node.js | Contenerizar el proyecto con persistencia | Levantarlo desde cero |

**Objetivo:** empaquetar y ejecutar la aplicación de forma reproducible.

**Entregable: aplicación contenerizada**
- **Por qué:** "en mi máquina funciona" deja de ser excusa.
- **Impacto:** el despliegue en cloud se basa en esto.
- **Qué refleja:** reproducibilidad.

**Guía de armado**
1. `Dockerfile` multi-stage.
2. `.dockerignore`.
3. `docker-compose.yml` con API y PostgreSQL con volumen.
4. Probá: levantar, escribir datos, reiniciar y verificar persistencia.
5. README con los comandos y un apartado "problemas encontrados".

## Semana 19: Compose y arquitectura de aplicaciones

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Docker Compose](https://docs.docker.com/compose/) | `compose.yaml` con API y DB | Agregar un health check |
| Mar | [Nginx reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) + [Certbot](https://certbot.eff.org/) | Proxy delante de la API | Probar el acceso por el proxy |
| Mié | [Refactoring Guru: refactoring](https://refactoring.guru/refactoring) | Detectar acoplamientos en tu API | Listar 3 |
| Jue | [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) + [Hexagonal](https://alistair.cockburn.us/hexagonal-architecture/) + [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate) | Dibujar capas del proyecto | **SQL:** 1 migración con Prisma |
| Vie | Material de la semana | Refactorizar con tests antes y después | Correr los tests antes de empezar |

**Objetivo:** separar responsabilidades sin cambiar el comportamiento.

**Entregable: API refactorizada con tests antes y después**
- **Por qué:** refactorizar sin tests es adivinar.
- **Impacto:** el código se vuelve cambiable.
- **Qué refleja:** disciplina de mantenimiento.

**Guía de armado**
1. Escribí los tests del comportamiento actual y verificá que pasen.
2. Separá carpetas: `domain/`, `application/`, `infrastructure/`.
3. Mové la lógica por pasos; corré los tests tras cada paso.
4. `docs/decisions.md` con cada decisión y su motivo.
5. Añadí un health check y el proxy en Compose.

## Semana 20: Diseño, patrones y sistemas distribuidos

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Refactoring Guru: code smells](https://refactoring.guru/refactoring/smells) | Identificar 2 smells en tu código | Elegir 1 y corregirlo |
| Mar | [Refactoring Guru: design patterns](https://refactoring.guru/design-patterns) (Strategy, Adapter, Factory) | Un ejemplo en TS | Explicar cuándo no usarlo |
| Mié | Refactoring Guru (Repository, Facade, Observer, Command) | Un ejemplo en TS | Elegir un patrón para tu proyecto |
| Jue | [microservices.io](https://microservices.io/patterns/) + [DDD Reference](https://www.domainlanguage.com/ddd/reference/) + [Idempotencia (Stripe)](https://docs.stripe.com/api/idempotent_requests) + [BullMQ](https://docs.bullmq.io/) + [Locking en PostgreSQL](https://www.postgresql.org/docs/current/explicit-locking.html) | Una cola con un job idempotente | **SQL:** `SELECT ... FOR UPDATE` |
| Vie | [System Design Primer](https://github.com/donnemartin/system-design-primer) + [ADRs](https://adr.github.io/) + [Pact](https://docs.pact.io/) | Refactorizar la API de créditos | Escribir 1 ADR |

**Objetivo:** tomar decisiones de diseño justificadas.

**Entregable: backend modular, tests, diagrama y ADRs**
- **Por qué:** los patrones se justifican por el problema, no por moda.
- **Impacto:** el proyecto queda como monolito modular con límites claros.
- **Qué refleja:** criterio de diseño.

**Guía de armado**
1. `docs/problemas.md`: problemas iniciales (acoplamiento, reglas en controllers, acceso directo a Prisma, integraciones mezcladas, etc.).
2. Separá controllers, servicios, repositorios e integraciones.
3. Una interfaz para notificaciones, de modo que agregar un proveedor no toque otros módulos.
4. Tests unitarios sin mocks excesivos y un contract test.
5. Diagrama de arquitectura.
6. Mínimo 3 ADRs (contexto, decisión, alternativas, consecuencias).

**Evaluación de etapa:** aplicación contenerizada, documentación arquitectónica, y poder explicar por qué monolito modular, cuándo separarías servicios y cómo controlar la persistencia.

---

# ETAPA 6: AWS, DevOps, seguridad y observabilidad (sem 21–24)

## Semana 21: AWS, identidad, cómputo y redes

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [AWS Skill Builder](https://skillbuilder.aws/) | Notas | Ubicar la región más cercana |
| Mar | [IAM docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) | Política de mínimo privilegio | Comparar rol vs usuario en 3 frases |
| Mié | [EC2 docs](https://docs.aws.amazon.com/ec2/) | Instancia y SSH | Apagarla al terminar |
| Jue | [VPC docs](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) + [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) | Diagrama de VPC | **SQL:** una policy RLS simple |
| Vie | VPC docs | VPC con subred pública y privada | Justificar 1 regla de Security Group |

**Objetivo:** acceso seguro (IAM) y red segmentada (VPC).

**Entregable: diagrama de red y políticas IAM**
- **Por qué:** la mayoría de incidentes cloud nace de permisos o exposición excesivos.
- **Impacto:** definís qué es público y qué no.
- **Qué refleja:** mentalidad de mínimo privilegio.

**Guía de armado**
1. `docs/network.md` con el diagrama de la VPC.
2. Subred pública y privada, y qué vive en cada una.
3. `iam/policy.json` de mínimo privilegio para un caso.
4. Reglas de Security Group con la justificación de cada una.
5. Comparación breve roles vs usuarios.

## Semana 22: AWS, datos y distribución

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [S3 docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) | Bucket con versioning | Subir y recuperar un archivo |
| Mar | [RDS docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) | Diseño de RDS (sin necesidad de desplegar) | Elegir el período de backup |
| Mié | [Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/) + [Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) | Diagrama con ALB y DNS | Decir qué es público y qué privado |
| Jue | [CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html) | Alarma de costo | **SQL:** plan de backup y restauración |
| Vie | [Pricing Calculator](https://calculator.aws/) | Arquitectura y costo mensual (despliegue solo si el presupuesto es controlado) | Estimar el costo del mes |

**Objetivo:** diseñar almacenamiento, base de datos y monitoreo con costos.

**Entregable: arquitectura y plan operativo**
- **Por qué:** una arquitectura sin plan de operación y costos no es defendible.
- **Impacto:** sabés cuánto cuesta y cómo se recupera.
- **Qué refleja:** visión de operación.

**Guía de armado**
1. `docs/architecture-aws.md` con el diagrama.
2. Qué guarda S3 y qué guarda RDS.
3. Estrategia de backup y restauración.
4. Tabla de costos mensuales del Pricing Calculator.
5. Alarmas mínimas (costo y errores).

## Semana 23: CI/CD e Infrastructure as Code

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [GitHub Actions docs](https://docs.github.com/en/actions) | Entender workflow, job y runner | Crear un workflow de "hola mundo" |
| Mar | [Actions para Node.js](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs) | Lint y tests en CI | Agregar 1 secreto |
| Mié | [Terraform: AWS Get Started](https://developer.hashicorp.com/terraform/tutorials/aws-get-started) | Tutorial oficial | Correr `terraform plan` |
| Jue | [Terraform docs](https://developer.hashicorp.com/terraform/docs) + Prisma Migrate | Una variable y un output | **SQL:** migración dentro del pipeline |
| Vie | Material de la semana | Pipeline completo con rollback | Revertir un deploy |

**Objetivo:** automatizar pruebas, despliegue e infraestructura.

**Entregable: pipeline + Terraform**
- **Por qué:** lo manual no se repite igual dos veces.
- **Impacto:** cada cambio se prueba y se despliega de forma controlada.
- **Qué refleja:** madurez DevOps.

**Guía de armado**
1. `.github/workflows/ci.yml`: lint, test y build.
2. Agregá el job de despliegue con secretos.
3. `infra/main.tf`, `variables.tf`, `outputs.tf`.
4. `terraform plan` guardado antes de aplicar.
5. `docs/rollback.md` con el procedimiento probado.

## Semana 24: Seguridad, observabilidad y performance

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [OWASP Top 10](https://owasp.org/www-project-top-ten/) + [Cheat Sheets](https://cheatsheetseries.owasp.org/) | Revisar tu API | Marcar 3 riesgos |
| Mar | AWS: seguridad y cifrado | Revisar IAM y exposición | Verificar que no haya puertos innecesarios abiertos |
| Mié | [OpenTelemetry](https://opentelemetry.io/docs/getting-started/) | Instrumentar la API | Ver 1 traza |
| Jue | [Prometheus](https://prometheus.io/docs/introduction/first_steps/) + [Grafana](https://grafana.com/docs/grafana/latest/getting-started/) + [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) | Dashboard simple | **SQL:** encontrar la consulta más lenta |
| Vie | [k6](https://grafana.com/docs/k6/latest/) + [Postmortems (Google SRE)](https://sre.google/sre-book/postmortem-culture/) | Prueba de carga y reporte | Escribir 5 líneas de incidente |

**Objetivo:** detectar, medir y diagnosticar.

**Entregable: reporte de seguridad, dashboard y prueba de carga**
- **Por qué:** lo que no se mide no se puede mejorar.
- **Impacto:** encontrás cuellos de botella antes que los usuarios.
- **Qué refleja:** operación con datos.

**Guía de armado**
1. `docs/security-review.md` con 3 riesgos OWASP y su mitigación.
2. Instrumentá la API con trazas y métricas.
3. Dashboard en Grafana (captura en el repo).
4. `load/test.js` con k6 y los resultados.
5. `docs/incident-report.md`: síntoma, causa, solución y prevención.

**Evaluación de etapa:** explicar cómo se despliega, cómo se controla el acceso, cómo se monitorea y cómo se investiga un incidente.

---

# ETAPA 7: Consolidación y empleabilidad (sem 25–28)

La plataforma ya existe y viene creciendo desde la semana 9. Esta etapa la audita, la mide y la defiende.

## Semana 25: Auditoría y brechas

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | LeetCode / NeetCode | 3 problemas mixtos sin IA | Revisar 1 solución propia |
| Mar | [Tech Interview Handbook](https://www.techinterviewhandbook.org/) | Revisar alcance y requisitos del proyecto | Escribir 3 requisitos no funcionales |
| Mié | [Pricing Calculator](https://calculator.aws/) | Comparar costo real vs estimado | Anotar la diferencia |
| Jue | ADRs + System Design Primer | Auditar arquitectura y modelo de datos | Elegir 1 deuda técnica |
| Vie | Vitest | Revisar cobertura | Agregar 1 test faltante |

**Objetivo:** revisar con ojo crítico lo construido y priorizar.

**Entregable: informe de auditoría y backlog**
- **Por qué:** detectar tus propias brechas es parte de ser senior.
- **Impacto:** las semanas 26-27 se enfocan en lo que más importa.
- **Qué refleja:** autocrítica técnica.

**Guía de armado**
1. `docs/audit.md` con un checklist: arquitectura, datos, tests, costos.
2. Marcá cada ítem como ok, parcial o falta.
3. Backlog priorizado (impacto y esfuerzo).
4. Cerrá al menos 2 deudas.

## Semana 26: Calidad del producto de IA

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | System Design Primer | Un diseño de sistema chico | Dibujar los componentes |
| Mar | Ragas | Mejorar chunking con métricas | Comparar 2 tamaños |
| Mié | Row Level Security + OWASP | Tests de acceso cruzado entre tenants | Probar que un tenant no ve datos de otro |
| Jue | BullMQ + Stripe idempotencia | Cola en un flujo crítico | Reenviar un job y comprobar que no se duplica |
| Vie | Ragas | Ampliar el dataset de evaluación | Sumar 5 preguntas |

**Objetivo:** mejorar y medir retrieval y aislamiento por tenant.

**Entregable: reporte de calidad y tests de acceso**
- **Por qué:** una plataforma B2B no puede filtrar datos entre clientes.
- **Impacto:** confianza del cliente y base del reporte final.
- **Qué refleja:** rigor en IA y seguridad.

**Guía de armado**
1. Dataset de evaluación ampliado (`eval/questions.json`).
2. Tabla antes/después de cada cambio (chunking, k, filtros).
3. Tests de acceso cruzado entre tenants.
4. Cola con idempotencia en un flujo crítico.
5. Resumen de mejoras y su impacto.

## Semana 27: Agente, seguridad y operación

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | Use The Index, Luke | Optimizar 1 consulta | Comparar tiempo antes y después |
| Mar | OWASP LLM Top 10 | Pruebas de acciones no autorizadas | Documentar 3 casos |
| Mié | OWASP + IAM docs | Revisión de seguridad | Rotar 1 secreto |
| Jue | GitHub Actions + RDS | Rollback y restauración de backup | Restaurar un backup de prueba |
| Vie | k6 + Grafana | Prueba de carga y alertas | Definir 1 alerta |

**Objetivo:** probar que el sistema resiste fallos y abusos.

**Entregable: paquete de seguridad y operación**
- **Por qué:** lo defendible es lo que probaste, no lo que supusiste.
- **Impacto:** podés mostrar evidencia de cada afirmación.
- **Qué refleja:** confiabilidad.

**Guía de armado**
1. `docs/agent-security-tests.md` con casos de acciones no autorizadas y resultado.
2. Revisión de secretos y permisos.
3. Prueba de rollback y de restauración de backup (con registro).
4. Prueba de carga con alertas.
5. Lista final de riesgos conocidos.

## Semana 28: Defensa y empleabilidad

| Día | Recurso ancla | Práctica | Desafío |
|---|---|---|---|
| Lun | [Tech Interview Handbook](https://www.techinterviewhandbook.org/) | Simulacro de algoritmos | Resolver 1 problema en voz alta |
| Mar | Ragas | Reporte final del sistema de IA: métricas, costos, límites | Resumir los límites en 5 líneas |
| Mié | [Google SRE](https://sre.google/sre-book/table-of-contents/) | Runbook operativo | Escribir 1 procedimiento de recuperación |
| Jue | [Make a README](https://www.makeareadme.com/) | README, diagramas y demo | Grabar un demo de 3 minutos |
| Vie | Tech Interview Handbook | Defensa del proyecto, CV, LinkedIn y portfolio | Publicar el repo con README |

**Objetivo:** presentar el proyecto como evidencia profesional.

**Entregable final: producto defendible + portfolio**
- **Por qué:** el trabajo no se vende solo; hay que contarlo con evidencia.
- **Impacto:** convierte 28 semanas en entrevistas.
- **Qué refleja:** capacidad técnica y de comunicación.

**Guía de armado**
1. README principal: problema, arquitectura, cómo correrlo y demo.
2. `docs/ai-report.md`: métricas, costos y límites.
3. `docs/runbook.md` operativo.
4. Video demo de 3 minutos.
5. CV, LinkedIn y portfolio con un caso del proyecto.
6. Ensayo de la defensa de 10 minutos, con preguntas difíciles.

**Evaluación final:** defender de punta a punta arquitectura, IA, seguridad, despliegue y operación.