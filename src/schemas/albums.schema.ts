import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Artist } from "./artists.schema";
import mongoose, { Document } from "mongoose";

export type AlbumDocument = Album & Document;
@Schema()
export class Album {
  @Prop({
    required:true,
    type:mongoose.Schema.Types.ObjectId,
    ref:"Artist"
  })
  artist:Artist;

  @Prop({required: true,})
  title:string;

  @Prop()
  yearOfProduction:number;

  @Prop()
  image:string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);