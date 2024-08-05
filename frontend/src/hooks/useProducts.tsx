/* eslint-disable react-hooks/exhaustive-deps */
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import axios from "../lib/axios.config";
import { showAddOrEditProductState, showDeleteProductState } from "../store";
import { Product } from "../types";
import useAuth from "./useAuth";


export default function useProducts() {
    const { user } = useAuth();
    const [creatingProduct, setCreatingProduct] = useState(false);
    const [deletingProduct, setDeletingProduct] = useState(false);
    const [updatingProduct, setUpdatingProduct] = useState(false);
    const [, setShowAddOrEdit] = useRecoilState(showAddOrEditProductState);
    const [, setShowDelete] = useRecoilState(showDeleteProductState);

    const { data: products, isLoading, error, mutate } = useSWR<Product[]>("/products", async (url) => {
        if (!user) return;
        const { data } = await axios.get(url);
        return data.products;
    });

    useEffect(() => {
        mutate();
    }, [user])

    const createProduct = async (product: Omit<Product, "id" | "createdAt">) => {
        setCreatingProduct(true);
        try {
            const { data } = await axios.post("/products", product);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Product created successfully",
                    color: "blue"
                });
                mutate([...products || [], data.product]);
                setShowAddOrEdit(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setCreatingProduct(false);
        }
    }

    const deleteProduct = async (id: string) => {
        setDeletingProduct(true);
        try {
            const { data } = await axios.delete(`/products/${id}`);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Product deleted successfully",
                    color: "blue"
                });
                mutate(products?.filter(product => product.id !== id));
                setShowDelete(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setDeletingProduct(false);
        }
    }

    const updateProduct = async (product: Product) => {
        setUpdatingProduct(true);
        try {
            const { data } = await axios.put(`/products/${product.id}`, product);
            if (data.success) {
                notifications.show({
                    title: "Success",
                    message: "Product updated successfully",
                    color: "blue"
                });
                mutate(products?.map(p => p.id === product.id ? product : p));
                setShowAddOrEdit(null);
            } else {
                notifications.show({
                    title: "Error",
                    message: "An error occurred",
                    color: "red"
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({
                title: "Error",
                message: "An error occurred",
                color: "red"
            });
        } finally {
            setUpdatingProduct(false);
        }
    }

    return {
        products,
        isLoading,
        error,
        createProduct,
        deleteProduct,
        updateProduct,
        creatingProduct,
        deletingProduct,
        updatingProduct
    }

}