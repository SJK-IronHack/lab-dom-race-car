class Game {
  constructor() {
    this.startScreen = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.endScreen = document.getElementById('game-end')
    this.height = 600
    this.width = 500
    this.player = null
    this.obstacles = []
    this.animateId = null
    this.score = 0
    this.lives = 3
    this.isGameOver = false
  }

  start() {
    this.startScreen.style.display = 'none'
    this.endScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'
    this.gameScreen.style.height = `${this.height}px`
    this.gameScreen.style.width = `${this.width}px`

    this.player = new Player(this.gameScreen)
    this.gameLoop()
  }

  gameLoop() {
    this.player.move()

    const nextObstacles = []
    this.obstacles.forEach(currentObstacle => {
      currentObstacle.move()
      if (currentObstacle.top < 560) {
        if (this.player.didCollide(currentObstacle)) {
          console.log('collision')
          currentObstacle.element.remove()
          this.lives -= 1
          if (this.lives <= 0) {
            this.isGameOver = true
          }
        } else {
          nextObstacles.push(currentObstacle)
        }
      } else {
        currentObstacle.element.remove()
        this.score += 10
      }
    })
    this.obstacles = nextObstacles

    if (this.animateId % 300 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen))
    }

    console.log(this.obstacles)

    document.getElementById('score').innerText = this.score
    document.getElementById('lives').innerText = this.lives

    if (this.isGameOver) {
      this.gameScreen.style.display = 'none'
      this.endScreen.style.display = 'block'
      this.player.element.remove()
    } else {
      console.log(this.animateId)
      this.animateId = requestAnimationFrame(() => this.gameLoop())
    }
  }
}
