const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (_, { userId }) => {
        return User.findOne({ _id: userId });
        },
        currentUser: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
        }
    },
    Mutation: {
        createUser: async (_, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
      
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
            return { token, user };
          },
    }
}

module.exports = resolvers;