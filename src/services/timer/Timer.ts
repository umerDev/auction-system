export class ClassTimer {
  private readonly duration: number;
  private completed: boolean = false;

  constructor(duration: number) {
    this.duration = duration;
  }

  Start() {
    setTimeout(() => {
      this.setCompleted(true);
    }, this.duration);
  }

  GetCompleted() {
    return this.completed;
  }

  setCompleted(complete: boolean) {
    this.completed = complete;
  }
}
