module.exports = (sequelize,Sequelize) => {
    const Student = sequelize.define('student', {
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.INTEGER
        },
        sbio: { 
            type: Sequelize.STRING
        }
    });

    return Student;
};