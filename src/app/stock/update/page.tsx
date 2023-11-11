"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  KeyboardBackspace,
  Edit,
  Delete,
  ContentPaste,
} from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
  LinearProgress,
  TextField,
} from "@mui/material";
import { MuiFileInput } from "mui-file-input";

// internal components
import Modal from "@/components/Modal";
import ModalDelete from "@/components/Modal";
import DefaultWrapper from "@/components/DefaultWrapper";

interface ListStockInterface {
  id: string;
  name: string;
  code: string;
  uom: string;
}
const StockUpdate: React.FC = () => {
  const router = useRouter();
  const [listStock, setListStock] = useState<ListStockInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [activeDelete, setActiveDelete] = useState<ListStockInterface>();
  const [activeEdit, setActiveEdit] = useState<ListStockInterface>();
  const [activeEditTemp, setActiveEditTemp] = useState<ListStockInterface>();

  useEffect(() => {
    handleGetStock();
  }, []);

  const handleGetStock = async () => {
    setLoading(true);
    try {
      await fetch("/api/stock").then(async (res) => {
        const data = await res.json();
        setListStock(data);
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllStock = async () => {
    setLoading(true);
    try {
      await fetch("/api/stock/delete", {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ id: null }),
      }).then(async () => {
        setListStock([]);
      });
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStockById = async () => {
    setLoading(true);
    await fetch("/api/stock/delete", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({ id: activeDelete?.id }),
    }).then(async () => {
      setLoading(false);
      const transform = listStock.filter(
        (stock) => stock.id !== activeDelete?.id
      );
      setListStock(transform);
    });
  };

  const handleChangeFile = async (file: File | null) => {
    if (!file) return;
    setLoading(true);
    try {
      const body = new FormData();
      body.append("file", file);

      await fetch("/api/stock/update/excel", {
        method: "POST",
        body,
      }).then(async () => {
        handleGetStock();
      });
    } catch (e: any) {
      console.error(e);
    }
  };

  const goBacks = () => {
    router.push("/");
  };

  const openTemplate = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1wbkvUy404C13WSvAlSR2HMaRm3i-D86amSBmA3eMyFs/edit?usp=drive_link",
      "_blank"
    );
  };

  const handleEdit = (type: keyof ListStockInterface, value: string) => {
    const transform = {
      id: activeEditTemp?.id || "",
      name: activeEditTemp?.name || "",
      code: activeEditTemp?.code || "",
      uom: activeEditTemp?.uom || "",
      [type]: value,
    };
    setActiveEditTemp(transform);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    try {
      await fetch("/api/stock/update", {
        method: "POST",
        body: JSON.stringify(activeEditTemp),
      }).then(async () => {
        handleGetStock();
      });
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultWrapper
      title="UPDATE STOCK DATA"
      leftIcon={
        <IconButton onClick={goBacks}>
          <KeyboardBackspace sx={{ color: "white" }} />
        </IconButton>
      }
    >
      <Stack mt={2} spacing={2}>
        <Stack direction="row">
          <MuiFileInput
            label="tambahkan daftar stock terbaru sesuai template"
            onChange={handleChangeFile}
            inputProps={{
              accept: ".xlsx, .xls, .csv",
            }}
          />

          <Button onClick={openTemplate}>
            <ContentPaste />
          </Button>
        </Stack>
        <Button
          disabled={loading}
          variant="outlined"
          onClick={handleDeleteAllStock}
        >
          Hapus Semua Data Stock
        </Button>
        {loading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <Box>
          <List dense>
            <ListItem key="header">
              <ListItemText>Nama</ListItemText>
              <Typography variant="subtitle2" mr={5}>
                Code
              </Typography>
              <Typography variant="subtitle2" mr={2}>
                Uom{" "}
              </Typography>
              <Typography variant="subtitle2">Aksi </Typography>
            </ListItem>
            <Divider />
            {listStock.map((stock) => {
              return (
                <>
                  <ListItem
                    key={stock?.name}
                    secondaryAction={
                      <IconButton
                        onClick={() => {
                          setModalDelete(true);
                          setActiveDelete({
                            ...stock,
                          });
                        }}
                      >
                        <Delete color="action" sx={{ fontSize: 17 }} />
                      </IconButton>
                    }
                    sx={{ paddingRight: 3 }}
                  >
                    <ListItemIcon>
                      <IconButton
                        onClick={() => {
                          setModalOpen(true);
                          setActiveEdit(stock);
                          setActiveEditTemp(stock);
                        }}
                      >
                        <Edit sx={{ fontSize: 17 }} />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText>{stock?.name}</ListItemText>
                    <Typography variant="subtitle2" mr={5}>
                      {stock?.code}
                    </Typography>
                    <Typography variant="subtitle2" mr={5}>
                      {stock?.uom}
                    </Typography>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        </Box>
      </Stack>

      <Modal
        title="EDIT"
        open={modalOpen}
        onAction={() => {
          setModalOpen(false);
          handleSaveEdit();
        }}
        onDismiss={() => {
          setModalOpen(false);
        }}
      >
        <Stack spacing={2} mt={2}>
          <TextField
            placeholder="name"
            onChange={(e) => handleEdit("name", e.target.value)}
            defaultValue={activeEdit?.name}
          />
          <TextField
            placeholder="code"
            onChange={(e) => handleEdit("code", e.target.value)}
            defaultValue={activeEdit?.code}
          />
          <TextField
            placeholder="uom"
            onChange={(e) => handleEdit("uom", e.target.value)}
            defaultValue={activeEdit?.uom}
          />
        </Stack>
      </Modal>

      <ModalDelete
        open={modalDelete}
        title="DELETE"
        actionTitle="HAPUS"
        onDismiss={() => {
          setModalDelete(false);
        }}
        onAction={() => {
          setModalDelete(false);
          handleDeleteStockById();
        }}
      >
        <Typography fontSize={20}>
          Anda yakin akan menghapus <strong>{activeDelete?.name}</strong>?
        </Typography>
      </ModalDelete>
    </DefaultWrapper>
  );
};

export default StockUpdate;
