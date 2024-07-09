const navItems = document.querySelectorAll('.nav-item')

navItems.forEach((navItem, i) => {
  navItem.addEventListener('click', () => {
    navItems.forEach((item, j) => {
      item.className = 'nav-item'
    })
    navItem.className = 'nav-item active'
  })
})

const containers = document.querySelectorAll('.containers')

containers.forEach(container => {
  let isDragging = false
  let startX
  let scrollLeft

  container.addEventListener('mousedown', e => {
    isDragging = true
    startX = e.pageX - container.offsetLeft
    scrollLeft = container.scrollLeft
  })

  container.addEventListener('mousemove', e => {
    if (!isDragging) return
    e.preventDefault()

    const x = e.pageX - container.offsetLeft
    const step = (x - startX) * 0.6
    container.scrollLeft = scrollLeft - step
  })

  container.addEventListener('mouseup', () => {
    isDragging = false
  })

  container.addEventListener('mouseleave', () => {
    isDragging = false
  })
})

const progress = document.getElementById('progress')
const song = document.getElementById('song')
const controlIcon = document.getElementById('controlIcon')
const playPauseButton = document.querySelector('.play-pause-btn')
const forwardButton = document.querySelector('.controls button.forward')
const backwardButton = document.querySelector('.controls button.backward')
const rotatingImage = document.getElementById('rotatingImage')
const songName = document.querySelector('.music-player h2')
const artistName = document.querySelector('.music-player p')

let rotating = false
let currentRotation = 0
let rotationInterval

const songs = [
  {
    title: 'i really want to stay at your house',
    name: '電馭叛客',
    source: 'https://github.com/Lisia229/Zack2024/blob/main/aidio/i-really-want-to-stay-at-your-house-lyric-amv-cyberpunk-edgerunners.mp3',
    cover: 'https://i.ytimg.com/an_webp/q74fX9CnqtQ/mqdefault_6s.webp?du=3000&sqp=CJiBtbQG&rs=AOn4CLD9aFhr7iWgDrnlX-9No8qUpsgDWQ'
  },
  {
    title: 'D.D.D.D',
    name: 'ドロヘドロ',
    source: 'https://github.com/Lisia229/Zack2024/blob/main/aidio/tvanime-dorohedoro-nonkurezitsutoendeinguying-xiang-k-now_name-d-d-d-d.mp3',
    cover: 'https://i.ytimg.com/vi/hF7QDvrBT9Q/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBggy56to2hCkkbAXv6u82gWYrr6w'
  },
  {
    title: '浣熊',
    name: '洪申豪 ',
    source: 'https://github.com/Lisia229/Zack2024/blob/main/aidio/wan-xiong-acoustic-ver.mp3',
    cover:
      'https://i.ytimg.com/vi/Xs-CVGZVe6Q/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIFUoQzAP&rs=AOn4CLARXv_ytCdwZuMtu6Zxq9lzDeCgMg'
  }
]

let currentSongIndex = 0

function startRotation() {
  if (!rotating) {
    rotating = true
    rotationInterval = setInterval(rotateImage, 50)
  }
}

function pauseRotation() {
  clearInterval(rotationInterval)
  rotating = false
}

function rotateImage() {
  currentRotation += 1
  rotatingImage.style.transform = `rotate(${currentRotation}deg)`
}

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title
  artistName.textContent = songs[currentSongIndex].name
  song.src = songs[currentSongIndex].source
  rotatingImage.src = songs[currentSongIndex].cover

  song.addEventListener('loadeddata', function () {})
}

song.addEventListener('loadedmetadata', function () {
  progress.max = song.duration
  progress.value = song.currentTime
})

song.addEventListener('ended', function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  updateSongInfo()
  playPause()
})

song.addEventListener('timeupdate', function () {
  if (!song.paused) {
    progress.value = song.currentTime
  }
})

function playPause() {
  if (song.paused) {
    song.play()
    controlIcon.classList.add('fa-pause')
    controlIcon.classList.remove('fa-play')
    startRotation()
  } else {
    song.pause()
    controlIcon.classList.remove('fa-pause')
    controlIcon.classList.add('fa-play')
    pauseRotation()
  }
}

playPauseButton.addEventListener('click', playPause)

progress.addEventListener('input', function () {
  song.currentTime = progress.value
})

progress.addEventListener('change', function () {
  song.play()
  controlIcon.classList.add('fa-pause')
  controlIcon.classList.remove('fa-play')
  startRotation()
})

forwardButton.addEventListener('click', function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length
  updateSongInfo()
  playPause()
})

backwardButton.addEventListener('click', function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length
  updateSongInfo()
  playPause()
})

updateSongInfo()

var swiper = new Swiper('.swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  speed: 600,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2000, // 设置自动播放间隔时间（毫秒）
    disableOnInteraction: false // 用户交互后是否停止自动播放
  },
  coverflowEffect: {
    rotate: 10,
    stretch: 120,
    depth: 200,
    modifier: 1,
    slideShadows: false
  },
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex)
    }
  },
  pagination: {
    el: '.swiper-pagination'
  }
})
