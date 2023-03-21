declare class YocoSDK {
    constructor(options: { publicKey: string });
    showPopup(options: {
      amountInCents: number;
      currency: string;
      name: string;
      description: string;
      callback: (result: { id?: string; error?: { message: string } }) => void;
    }): void;
  }
  