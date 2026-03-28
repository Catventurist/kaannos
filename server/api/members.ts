const members = [{
  name: 'Anthony Fu',
  username: 'antfu',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Baptiste Leproux',
  username: 'larbish',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  role: 'owner',
  avatar: { src: '/cat.png' }
}, {
  name: 'Céline Dumerc',
  username: 'celinedumerc',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Daniel Roe',
  username: 'danielroe',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Farnabaz',
  username: 'farnabaz',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Ferdinand Coumau',
  username: 'FerdinandCoumau',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Hugo Richard',
  username: 'hugorcd',
  role: 'owner',
  avatar: { src: '/cat.png' }
}, {
  name: 'Pooya Parsa',
  username: 'pi0',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Sarah Moriceau',
  username: 'SarahM19',
  role: 'member',
  avatar: { src: '/cat.png' }
}, {
  name: 'Sébastien Chopin',
  username: 'Atinux',
  role: 'owner',
  avatar: { src: '/cat.png' }
}]

export default eventHandler(async () => {
  return members
})
