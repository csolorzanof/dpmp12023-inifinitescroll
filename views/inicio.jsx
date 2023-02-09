import React from "react";
import { Box, Text, Divider, Spinner, FlatList, Image } from "native-base";
import { useInfiniteQuery } from 'react-query';
import { gamesApi } from "../api/games.api";

export const Inicio = ()=>{

    const {isLoading:cargandoJuegos, data:datosJuegos, hasNextPage, isFetchingNextPage, fetchNextPage} = 
        useInfiniteQuery('games', gamesApi.getTodosLosJuegos,
        {
            getNextPageParam: (lastPage)=>{
                if(lastPage.next !== null){
                    return lastPage.next;
                }

                return lastPage;
            }
        });

    const extractorLlaveJuego = (item, index)=>{        
        return index.toString();
    }

    const renderData = (resultado)=>{        
        return (
            <Box>
                <Text fontSize={20} py={2}>
                    {resultado.item.name}
                </Text>                
            </Box>
        );
    }

    const cargarMas = ()=>{
        if(hasNextPage){
            fetchNextPage();
        }
    }

    const renderSpinner = ()=>{
        return <Spinner color={'blue'} size={'lg'} />;
    }
    
    return cargandoJuegos ? (
        <Box
            flex={1}
            backgroundColor={'white'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            {renderSpinner}
        </Box>
    ):(        
        <Box flex={1} safeAreaTop backgroundColor={'white'}>
            <Box height={16} justifyContent={'center'} px={2}>
                <Text fontSize={28} fontWeight={'600'} color={'red.600'}>
                    Lista de Juegos
                </Text>
            </Box>
            <Divider />
            <Box px={2}>
                <FlatList
                    data={datosJuegos.pages.map((page)=> page.results).flat()}
                    keyExtractor={extractorLlaveJuego}
                    renderItem={renderData}
                    onEndReached={cargarMas}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={isFetchingNextPage? renderSpinner: null}
                    />
            </Box>
        </Box>
    );
}