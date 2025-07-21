import { apiService } from "./api-service";

(async () => {
  try {
    const res = await apiService.registrarMovimientoInventario({ idProducto: 1, cantidad: 5, tipo: "ENTRADA" });
    console.log("OK:", res);
  } catch (e) {
    console.error("ERROR:", e);
  }
})();
