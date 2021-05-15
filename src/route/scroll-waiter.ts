// 延迟滚动

class ScrollQueue {
  private resolve: ((value?: any) => void) | null = null;
  private promise: Promise<any> | null = null;

  add() {
    this.promise = new Promise(resolve => {
      this.resolve = resolve;
    });
  }

  flush() {
    this.resolve && this.resolve();
    this.resolve = null;
    this.promise = null;
  }

  async wait() {
    await this.promise;
  }
}

const scrollWaiter = new ScrollQueue();

export default scrollWaiter;
