import { ExternalInstagramPackage } from "./external-pkg";

/**
 * Base class for all the components.
 */
abstract class Social {
  abstract post(): void;
}

/**
 * This class represnts a Schduler that can schedule posts for different social media platforms.
 */
class Scheduler {
  constructor() {}

  schedule(social: Social) {
    console.log(`Posting to social media...`);
    social.post();
  }
}

/**
 * Our class to post to Facebook
 */
class Facebook extends Social {
  post(): void {
    console.log(`Posting to Facebook...`);
  }
}

/**
 * Our class to post to LinkedIn
 */
class LinkeIn extends Social {
  post(): void {
    console.log(`Posting to LinkeIn...`);
  }
}

/**
 * We can create a wrapper class to adapt the external package to our design.
 * The example of using the adapter.
 *
 * @example
 * ```ts
 * function main() {
 *    const facebook = new Facebook();
 *    const linkedIn = new LinkeIn();
 *    // We use the adapter instead of the external package diectly.
 *    const instagram = new InstagramAdapter(new ExternalInstagramPackage());
 *
 *    // We can use the scheduler to post to different social media.
 *    const scheduler = new Scheduler();
 *    scheduler.schedule(facebook);
 *    scheduler.schedule(linkedIn);
 *    scheduler.schedule(instagram);
 * }
 * ```
 */
class InstagramAdapter extends Social {
  constructor(private instagram: ExternalInstagramPackage) {
    super();
  }

  post(): void {
    this.instagram.postWithDifferentName();
  }
}

export {
  ExternalInstagramPackage,
  Facebook,
  InstagramAdapter,
  LinkeIn,
  Scheduler,
  Social,
};
