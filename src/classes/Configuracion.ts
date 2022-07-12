class Configuration {
  color: string;

  constructor(opts?: {
    color?: string
  }) {
    opts || (opts = {});
    this.color = opts.color || '#ff0000';
  }
}

export default Configuration;
