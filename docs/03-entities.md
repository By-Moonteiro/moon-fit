# Entidades — Modelo Mental

## MVP

- ### User

Quem usa o app.

- Nome, email, senha
- Futuramente: papel (aluno, instrutor, admin) — Fase 2

- ### WorkoutPlan (Ficha de Treino)

O plano de treino do usuário em um período.

- Nome (ex: "Hipertrofia Jan/Fev")
- Data de início e fim (período de vida)
- Status: ativa | vencida | arquivada
- Pertence a um User

- ### TrainingDay (Dia de Treino)

Um grupo de treino dentro de uma ficha.

- Nome (ex: Treino A, Upper, Full Body)
- Ordem dentro da ficha
- Pertence a uma WorkoutPlan

- ### Exercise (Exercício)

Catálogo de exercícios pré-cadastrados no sistema.

- Nome
- Descrição
- Grupo muscular
- Gif/video de execução (pós-MVP)
- Não pertence a nenhum usuário — é global

- ### WorkoutSet (Exercício na Ficha)

É o exercício dentro de um dia de treino, com as configurações do usuário.

- Exercício (referência ao Exercise)
- Carga
- Repetições
- Tempo de descanso
- Ordem dentro do dia
- Pertence a um TrainingDay

---

## Pos-MVP

### TrainingSession (Sessão de Treino)

Representa uma vez que o usuário treinou — o registro real.

- Data
- Tempo total (cronômetro geral)
- Status: em andamento | finalizada
- Pertence a um TrainingDay

### SetLog (Registro de Série)

Registro de cada série feita durante uma sessão.

- Série concluída? (boolean)
- Carga usada (pode diferir do planejado)
- Repetições feitas (pode diferir do planejado)
- Pertence a uma TrainingSession e a um WorkoutSet

### Note (Anotação)

Anotação livre que pode ser feita em vários contextos.

- Conteúdo (texto)
- Contexto: pode estar ligada a WorkoutSet, TrainingSession ou TrainingDay
- Data

---

## Relacionamentos (resumo)

User → tem várias WorkoutPlan
WorkoutPlan → tem vários TrainingDay
TrainingDay → tem vários WorkoutSet
WorkoutSet → referencia um Exercise
TrainingDay → tem várias TrainingSession
TrainingSession → tem vários SetLog
Note → pode estar ligada a WorkoutSet, TrainingSession ou TrainingDay
