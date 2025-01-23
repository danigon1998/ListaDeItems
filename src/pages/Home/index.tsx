import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Platform} from "react-native";
import { Category } from "../../interfaces/ICategoria";
import { ListItem } from "../../interfaces/IProduto";
import { mockCategories } from "../../data";
import { Menu, Button, Card, Title} from 'react-native-paper'; 
import List from "../../components/listComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(){

    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [selectedItems, setSelectedItems] = useState<ListItem[]>([]);
    const [visible, setVisible] = useState(false);
    const showScrollIndicator = Platform.select({
        web: true,
        default: false,
    })

    useEffect (()=>{
        const loadSelecteditems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('selectedItems');
                if (storedItems) {
                    setSelectedItems(JSON.parse(storedItems));
                }
            } catch (error) {
                console.error('Erro carregando categorias:', error);
            }
        };

        loadSelecteditems();
    }, [])

    useEffect(() =>{
        const saveSelectedItems = async () => {
            try {
                await AsyncStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            } catch (error) {
                console.error('Erro guardandos categorias:', error);
            }
        };

        saveSelectedItems();
    }, [selectedItems])

    function handleCategoryChange(categoryId : string){
        setSelectedCategoryId(categoryId);
        const selectedCategory = categories.find((category) => category.id === categoryId);
        setCategory(selectedCategory);
    }

    function handleSelectionChange(updatedSelectedItems: ListItem[]){
        setSelectedItems(updatedSelectedItems);
    }

    return(
        <ScrollView>
            <View style = {styles.container}>
                <Text style={styles.header}>Escolha de Items para levar</Text>
                <Menu 
                visible = {visible} 
                onDismiss={() => setVisible(false )}
                anchor = {
                    <Button mode="outlined" 
                    onPress={() => setVisible(true)}
                    buttonColor="#e6d7ff"
                    textColor="#5d45bd">
                        {selectedCategoryId ? `${category?.name}` : 'Selecionar Categoría'}
                    </Button>
                }
                anchorPosition="bottom"
                contentStyle={styles.menu}
                >
                    {categories.map((category) => (
                        <Menu.Item
                            key={category.id}
                            onPress={() => {
                                handleCategoryChange(category.id);
                                setVisible(false);
                            }}
                            title={category.name}
                            titleStyle = {styles.categoryName}
                        />
                    ))}
                </Menu>
                {category && (
                    <View>
                        <List items={category.items} selectedItems={selectedItems} onSelectionChange={handleSelectionChange} />
                    </View>
                )}
                <View style={styles.selectedItemsContainer}>
                    <Text style={styles.selectedItemsHeader}>Items Selecionados: {selectedItems.length}</Text>
                    <FlatList
                        data={selectedItems}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={showScrollIndicator}
                        contentContainerStyle={{
                            paddingVertical: 10,
                        }}
                        renderItem={({ item }) => (
                            <Card style={styles.selectedItem}>
                                <Card.Content>
                                    <Title style={styles.titleText}>{item.name}</Title>
                                </Card.Content>
                            </Card>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 20,
    },
    categoryName: {
        color: '#5d45bd',
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    menu: {
        backgroundColor: '#e6d7ff',
        color: '#5d45bd',
        borderRadius: 10,
        padding: 10,
    },
    selectedItemsContainer: {
        marginTop: 5,
    },
    selectedItemsHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    selectedItem: {
        backgroundColor: '#e6d7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        width: 150,
    },
    titleText: {
        color: '#5d45bd',
    },
});