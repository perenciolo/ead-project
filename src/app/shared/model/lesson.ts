export class Lesson {
    constructor(
        public $key: string,
        public description: string,
        public duration: string,
        public url: string,
        public tags: string,
        public pro: boolean,
        public longDescription: string,
        public courseId: string
    ) { }

    get isBeginner() {
        return this.tags && this.tags.includes("BEGINNER");
    }

    static fromJSONList(array): Lesson[] {
        return array.map(json => Lesson.fromJSON(json));
    }

    static fromJSON({$key, description, duration, url, tags, pro, longDescription, courseId}): Lesson {
        return new Lesson(
            $key,
            description,
            duration,
            url,
            tags,
            pro,
            longDescription,
            courseId
        );
    }
}