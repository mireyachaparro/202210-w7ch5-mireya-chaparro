import { model, Schema, Types } from 'mongoose';

const robotsImagesURL = 'https://robohash.org';

export type ProtoRobotI = {
    name?: string;
    img?: string;
    speed?: number;
    resistance?: number;
    date?: string | Date;
    owner?: Types.ObjectId;
};

export type RobotI = {
    id: Types.ObjectId;
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: string;
    owner: Types.ObjectId;
};

export const robotSchema = new Schema<RobotI>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
        set: (name: string) => `${robotsImagesURL}/${name}`,
    },
    speed: { type: Number, min: 0, max: 10 },
    resistance: { type: Number, min: 0, max: 10 },
    date: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

robotSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
    },
});

export const Robot = model<RobotI>('Robot', robotSchema, 'robots');
