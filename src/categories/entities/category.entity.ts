import {
    Table, Column, Model, DataType, ForeignKey,
    AutoIncrement
} from 'sequelize-typescript';

import { User } from '../../users/models/user.model';

export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Table({
    tableName: 'categories',
    timestamps: true
})

export class Category extends Model<Category> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.ENUM('income', 'expense'),
        allowNull: false
    })
    type: CategoryType;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;


}