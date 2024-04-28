export class ClassTimer {
  private readonly duration: number;
  private completed: boolean = false;

  constructor(duration: number) {
    this.duration = duration;
  }

  startTimer() {
    setTimeout(() => {
      this.setCompleted(true);
    }, this.duration);
  }

  getCompleted() {
    return this.completed;
  }

  setCompleted(complete: boolean) {
    this.completed = complete;
  }
}
