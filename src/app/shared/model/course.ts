import { Observable } from 'rxjs/Rx';
import { Lesson } from './lesson';

export class Course {
    constructor(
        public $key: string,
        public url: string,
        public description: string,
        public iconUrl: string,
        public courseListIcon: string,
        public longDescription: string,
    ) { }

    static fromJSONArray(json: any[]): Course[] {
        return json.map(array => Course.fromJSON(array));
    }

    static fromJSON({
        $key,
        url,
        description,
        iconUrl,
        courseListIcon,
        longDescription,
    }): Course {
        return new Course(
            $key,
            url,
            description,
            iconUrl,
            courseListIcon,
            longDescription,
        );
    }
}