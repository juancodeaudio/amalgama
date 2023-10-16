export type SiteContent = typeof siteContent;
export type CourseType = typeof siteContent['courses']

export const siteContent = {
  courses: [
    {
      id: 100,
      slug: 'lyrics',
      title: 'Letras con alma',
      description: 'Tu viaje creativo',
      image: 'lyrics-bg.jpg',
      classes: [
        {
          id: 110,
          title: 'Introducción',
          slug: 'introduccion',
          description: 'Comienza el camino',
          content: 'lyrics1.mdx',
          duration: 1
        },
        {
          id: 120,
          title: 'De la vida a la página',
          slug: 'de-la-vida-a-la-pagina',
          description: 'Explorando la escritura musical',
          content: 'lyrics2.mdx',
          duration: 2
        },
        {
          id: 130,
          title: 'El ADN de la música',
          slug: 'el-adn-de-la-musica',
          description: 'Investigando las partes de una canción',
          content: 'lyrics3.mdx',
          duration: 5
        },
        {
          id: 140,
          title: 'Palabras con poder',
          slug: 'palabras-con-poder',
          description: 'Creando tus propias historias musicales',
          content: 'lyrics4.mdx',
          duration: 3
        },
        {
          id: 150,
          title: 'La métrica lírica',
          slug: 'la-metrica-lirica',
          description: 'Estructura y longitud de las letras',
          content: 'lyrics5.mdx',
          duration: 4
        }
      ]
    },
    {
      id: 200,
      slug: 'music',
      title: 'Música',
      description: 'Super mega descripción',
      image: 'music-bg.jpg',
      classes: [
        {
          id: 210,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 220,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 230,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 240,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        }
      ]
    },
    {
      id: 300,
      slug: 'experimentation',
      title: 'Experimentación',
      description: 'Super mega descripción',
      image: 'exper-bg.jpg',
      classes: [
        {
          id: 310,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 320,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 330,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        },
        {
          id: 340,
          title: '',
          slug: '',
          description: '',
          content: '',
          duration: 1
        }
      ]
    },
  ]
};
