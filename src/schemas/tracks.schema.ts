import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Album } from "./albums.schema";

export type TrackDocument = Track & Document;

@Schema()
export class Track {
  @Prop({
    required:true,
    type:mongoose.Schema.Types.ObjectId,
    ref:"Track",
  })
  album:Album;

  @Prop({required:true})
  name:string;

  @Prop({required:true})
  length:string;

  @Prop({required:true})
  number:number;
}

export const TrackSchema = SchemaFactory.createForClass(Track);