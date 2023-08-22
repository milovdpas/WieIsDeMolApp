import React, {ReactElement, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import User from '../../models/User';

type contextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext<contextType>({
    user: undefined,
    setUser: () => {
    },
});

const UserProvider = ({
                          children,
                      }: {
    children: ReactElement | ReactElement[];
}) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        //Check if user already exists in storage (on mount), if so set the user state to force rerender of this screen.
        const checkUserInStorage = async () => {
            const userJson = await EncryptedStorage.getItem('@user');
            if (!userJson) {
                return;
            }

            const newUser = JSON.parse(userJson) as User;
            if (JSON.stringify(user) === JSON.stringify(newUser)) {
                return;
            }
            setUser(newUser);
        };
        checkUserInStorage();
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export {UserProvider, useUser};
