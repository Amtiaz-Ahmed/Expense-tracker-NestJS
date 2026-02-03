import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

@Table({ tableName: 'income' })
export class Income extends Model<Income> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    declare userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare source: string;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    declare amount: number;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    declare date: Date;

    @Column({ type: DataType.STRING })
    declare description: string;

    @BelongsTo(() => User)
    user: User;
}


