import { DataTypes, Model } from "sequelize";
import bcrypt from 'bcrypt';

export default class User extends Model {
    static initialize(sequelize) {
        User.init(
            {
                login: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: 'login',
                    validate: { isEmail: { msg: 'Must be a valid email address' } },
                },
                iat: { type: DataTypes.BIGINT },
                password: { type: DataTypes.STRING, allowNull: false },
                name: { type: DataTypes.STRING, allowNull: false },
                rating: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
                favTypes: {
                    type: DataTypes.ARRAY(DataTypes.SMALLINT),
                    allowNull: true,
                    defaultValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                },
                imgUrl: { type: DataTypes.STRING, allowNull: true },
            },
            {
                sequelize,
                schema: 'public',
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
            }
        );

        function beforeCU(user){
            user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
        }

        User.beforeCreate(beforeCU);
        // User.beforeUpdate(beforeCU);
    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

