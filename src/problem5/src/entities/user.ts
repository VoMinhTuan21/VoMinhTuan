import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export type UserStatus = "Happy" | "Sad";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  status?: UserStatus;

  @Column()
  phoneNumbers: string;

  @Column({nullable: true})
  isDeleted?: boolean;
}