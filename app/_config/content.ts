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
          title: 'Introducción',
          slug: 'introduccion',
          description: 'Comienza el camino',
          content: 'lyrics1.mdx',
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
          title: 'Introducción',
          slug: 'introduccion',
          description: 'Comienza el camino',
          content: 'lyrics1.mdx',
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
  ],
  comments: [
    {
      authorName: 'Michael Gough',
      authorImage: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
      date: 'Feb. 8, 2022',
      content: 'Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy.'
    },
    {
      authorName: 'Jese Leos',
      authorImage: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
      date: 'Feb. 12, 2022',
      content: 'Much appreciated! Glad you liked it ☺️'
    },
    {
      authorName: 'Bonnie Green',
      authorImage: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
      date: 'Mar. 12, 2022',
      content: 'The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.'
    },
    {
      authorName: 'Helene Engels',
      authorImage: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
      date: 'Jun. 23, 2022',
      content: 'Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.'
    }
  ]
};
