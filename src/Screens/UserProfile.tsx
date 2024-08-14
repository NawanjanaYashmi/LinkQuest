import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmail = async () => {
            try {
                const storedEmail = await AsyncStorage.getItem('userEmail');
                setEmail(storedEmail);
            } catch (err) {
                setError('Failed to fetch email.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmail();
    }, []);

    const handleRemoveEmail = async () => {
        setLoading(true);
        setError(null);
        try {
            await AsyncStorage.removeItem('userEmail');
            setEmail(null);
        } catch (err) {
            setError('Failed to Sign out.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#75A82B" />
            ) : (
                <>
                    {error && <Text style={styles.error}>{error}</Text>}
                    {email ? (
                        <>
                            <Text style={styles.email}>Email: {email}</Text>
                            <TouchableOpacity style={styles.button} onPress={handleRemoveEmail}>
                                <Text style={styles.buttonText}>Sign out</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text style={styles.message}>No email found.</Text>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    email: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2A2A2A',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#75A82B',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#2A2A2A',
    },
});

export default UserProfile;