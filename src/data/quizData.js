export const quizLevels = [
  {
    level: 1,
    name: "Bronce",
    title: "Aprendiz de Laboratorio",
    badge: "🥉",
    badgeColor: "#cd7f32",
    description: "Demuestra conocimientos básicos sobre los patógenos contenidos.",
    requiredCorrect: 2,
    questions: [
      {
        question: "¿Qué porcentaje de la población europea eliminó la Peste Negra en el siglo XIV?",
        options: ["5-10%", "30-60%", "80-90%", "10-15%"],
        correct: 1,
        explanation: "La Peste Negra eliminó al 30-60% de la población europea, matando entre 75 y 200 millones de personas."
      },
      {
        question: "¿Cuál fue la primera enfermedad erradicada por vacunación?",
        options: ["Tuberculosis", "Cólera", "Viruela", "Gripe Española"],
        correct: 2,
        explanation: "La Viruela (Variola major) fue declarada erradicada por la OMS en 1980, gracias a la vacunación global."
      },
      {
        question: "¿Cuántas personas infectó la Gripe Española entre 1918-1920?",
        options: ["10 millones", "100 millones", "500 millones", "1 billón"],
        correct: 2,
        explanation: "La Gripe Española infectó a 500 millones de personas, aproximadamente 1/3 de la población mundial."
      }
    ]
  },
  {
    level: 2,
    name: "Plata",
    title: "Investigador Avanzado",
    badge: "🥈",
    badgeColor: "#C0C0C0",
    description: "Profundiza en los vectores de transmisión y la historia de las pandemias.",
    requiredCorrect: 3,
    questions: [
      {
        question: "¿Quién inventó la epidemiología moderna rastreando un brote de cólera?",
        options: ["Louis Pasteur", "Robert Koch", "John Snow", "Alexander Fleming"],
        correct: 2,
        explanation: "John Snow rastreó un brote de cólera en Londres en 1854 hasta una bomba de agua en Broad Street, sin saber qué eran las bacterias."
      },
      {
        question: "¿Cuál es el vector de transmisión principal de la Peste Negra?",
        options: ["Agua contaminada", "Mosquitos", "Pulgas de ratas negras", "Contacto sexual"],
        correct: 2,
        explanation: "La Peste Negra se transmite principalmente por las pulgas de ratas negras (Xenopsylla cheopis) y gotitas respiratorias."
      },
      {
        question: "¿Qué fracción de la humanidad está actualmente infectada con TB latente?",
        options: ["1 de cada 100", "1 de cada 10", "1 de cada 4", "1 de cada 2"],
        correct: 2,
        explanation: "Aproximadamente 1 de cada 4 personas en el mundo (2 mil millones) porta TB latente."
      },
      {
        question: "¿En qué año se reconstruyó artificialmente el virus de la Gripe Española?",
        options: ["1997", "2001", "2005", "2010"],
        correct: 2,
        explanation: "El virus fue reconstruido por Jeffery Taubenberger en 2005, a partir de tejido pulmonar de una víctima preservada en permafrost."
      },
      {
        question: "¿Cuántas pandemias globales de cólera ha habido desde 1817?",
        options: ["3", "5", "7", "9"],
        correct: 2,
        explanation: "Ha habido 7 pandemias de cólera desde 1817. La séptima comenzó en 1961 y sigue activa."
      }
    ]
  },
  {
    level: 3,
    name: "Oro",
    title: "Maestro Virólogo",
    badge: "🏆",
    badgeColor: "#FFD700",
    description: "Solo los verdaderos expertos sobreviven este nivel. Datos de los expedientes secretos.",
    requiredCorrect: 4,
    questions: [
      {
        question: "¿Qué mutación genética heredada de sobrevivientes de la Peste Negra confiere resistencia parcial al VIH?",
        options: ["BRCA1", "CCR5-delta32", "HLA-B57", "Factor V Leiden"],
        correct: 1,
        explanation: "La mutación CCR5-delta32, presente en ~10% de europeos, surgió como defensa contra la plaga y también confiere resistencia parcial al VIH."
      },
      {
        question: "¿Qué programa soviético secreto produjo toneladas de viruela armamentizada?",
        options: ["Operación Paperclip", "Proyecto Manhattan", "Biopreparat", "MK-Ultra"],
        correct: 2,
        explanation: "El programa Biopreparat de la URSS produjo armas biológicas con viruela. El científico desertor Ken Alibek reveló su existencia."
      },
      {
        question: "¿Por qué la Gripe Española mataba preferentemente a adultos jóvenes y sanos?",
        options: ["Por desnutrición", "Por la tormenta de citoquinas", "Por falta de vacunas", "Por condiciones de trinchera"],
        correct: 1,
        explanation: "La 'tormenta de citoquinas' hacía que el sistema inmunitario fuerte de los jóvenes atacara su propio cuerpo, llenando los pulmones de fluido."
      },
      {
        question: "¿Por qué el tratamiento de TB requiere 4 antibióticos durante 6-9 meses?",
        options: ["Para evitar efectos secundarios", "Porque la bacteria tiene una pared celular extremadamente gruesa", "Porque el virus muta rápido", "Porque solo funciona en combinación"],
        correct: 1,
        explanation: "La pared celular cerosa y gruesa de M. tuberculosis la hace casi impermeable, requiriendo un tratamiento prolongado con múltiples antibióticos."
      },
      {
        question: "¿Qué hicieron los mongoles en Caffa (Crimea) en 1346 que se considera el primer acto de bioterrorismo?",
        options: ["Envenenaron los pozos", "Catapultaron cadáveres infectados con peste sobre las murallas", "Liberaron ratas infectadas", "Distribuyeron mantas contaminadas"],
        correct: 1,
        explanation: "Los mongoles catapultaron cadáveres infectados con peste sobre las murallas de Caffa. Los sobrevivientes genoveses propagaron la Peste Negra a Europa."
      }
    ]
  }
];
