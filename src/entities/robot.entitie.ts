import mongoose, { Schema } from 'mongoose';

const robotsImagesURL = 'https://robohash.org';

export type ProtoRobot = {
    name?: string;
    img?: string;
    speed?: number;
    resistance?: number;
    date?: string | Date;
    owner?: typeof mongoose.Types.ObjectId;
};

export type Robot = {
    id: typeof mongoose.Types.ObjectId;
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: Date;
    owner: typeof mongoose.Types.ObjectId;
};

export const robotSchema = new Schema<Robot>({
    id: {
        type: mongoose.Types.ObjectId,
    },
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
    date: Date,
    owner: {
        type: mongoose.Types.ObjectId,
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
