import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'income' })
export class Income extends Model<Income> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    source: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    amount: number;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: Date;

    @Column({ type: DataType.STRING })
    description: string;

    @BelongsTo(() => User)
    user: User;
}


