import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Center, Divider, Grid, Loader, Paper, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Edit, Trash } from "tabler-icons-react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { deleteHook, getHook, getHookHits } from "../../services/api";

const WebhookId = () => {
  const router = useRouter();
  const [accessToken] = useLocalStorage({ key: "access-token" });

  const { id } = router.query;

  const { isLoading: loadingHook, data: hook } = useQuery(["cronhooks"], () =>
    getHook(accessToken, id)
  );

  const { isLoading: loadingHits, data: hookHits } = useQuery(
    ["cronhooks"],
    () => getHookHits(accessToken, id)
  );

  if (loadingHook || loadingHits) {
    return (
      <Center style={{ marginTop: 300, fontSize: 50 }}>
        <Loader />
      </Center>
    );
  }

  const handleDeleteHook = () => {
    Swal.fire({
      title: "¿Estas seguro que quieres borrar este Hook?",
      text: "Esta accion es irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteHook(accessToken, 123);

        // router.push("/");

        console.log(data);
        // TODO: Handle error
        if (data) {
          Swal.fire("Borrado!", "El hook fue eliminado.", "success");
        } else {
          Swal.fire("Error!", "Hubo un error al eliminar el hook.", "error");
        }
      }
    });
  };

  if (hook && hookHits) {
    return (
      <Center>
        <Paper shadow="xs" p="md">
          <Grid>
            <Grid.Col span={7}>
              <Link href="/">{`<- Volver`}</Link>
            </Grid.Col>
            <Grid.Col span={1} offset={3}>
              <Edit />
            </Grid.Col>
            <Grid.Col span={1}>
              <Trash
                onClick={handleDeleteHook}
                style={{
                  cursor: "pointer",
                }}
              />
            </Grid.Col>
          </Grid>
          <Divider my="sm" variant="dotted" />
          <Stack align="flex-start" spacing="xs">
            <p>Hook: {hook.id}</p>
            <p>URL: {hook.url}</p>
            <p>Method: {hook.method}</p>
            <p>Cron: {hook.cron}</p>
            <p>Hits: </p>
            {hookHits.length > 0 ? (
              hookHits.map((hit, i) => (
                <p key={`p${i}`}>
                  {hit.status} - {hit.response}
                </p>
              ))
            ) : (
              <p>No hits yet</p>
            )}
          </Stack>
        </Paper>
      </Center>
    );
  }
};

export default WebhookId;
