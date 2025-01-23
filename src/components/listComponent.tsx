import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "../interfaces/IProduto";
import { Checkbox } from "react-native-paper"

interface ListProps {
    items: ListItem[];
    selectedItems: ListItem[];
    onSelectionChange: (updateSelectedItemns: ListItem[]) => void;
}

export default function List({items, selectedItems, onSelectionChange}:ListProps){

    function ToggleSelection (item: ListItem){
        const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

        if (isSelected) {
            const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);
            onSelectionChange(updatedSelectedItems);
        } else {
            const updatedSelectedItems = [...selectedItems, item];
            onSelectionChange(updatedSelectedItems);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Opções</Text>
            {items.map((item) => {
                const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
                return (
                    <View key={item.id} style={styles.item}>
                        <Checkbox
                            status={isSelected ? 'checked' : 'unchecked'}
                            onPress={() => ToggleSelection(item)}
                            color="#5d45bd"
                        />
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#e6d7ff',
        borderRadius: 10,
        marginVertical: 16,
      },
      title: {
        color:"#5d45bd",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        marginLeft: 10,
      },
      item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
      },
      itemText: {
        color:"#5d45bd",
        fontSize: 16,
      },
});