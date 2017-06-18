export class Item {
    TYPE: string;
    NAME: string;
    REQUIREMENT: string;
    STAB: string;
    HACK: string;
    DEFENCE: string;
    MATTACK: string;
    MDEFENCE: string;
    ACCURACY: string;
    AGILITY: string;
    DEXTERITY: string;
    CRITICAL: string;
    DELAY: string;
    COMPOSE: string;
    IMAGE: string;

    static fromJSON(obj: any): Item {
        return Object.assign(new Item(), obj);
    }

    IMAGE_TRIMMED() {
        if (this.IMAGE) {
            let cdn_string: string[];
            let split_string = "/upload";
            cdn_string = this.IMAGE.split(split_string);
            if (cdn_string.length == 2) {
                return cdn_string[0] + split_string + "/e_trim" + cdn_string[1];
            }
        }
        return '';
    }
}