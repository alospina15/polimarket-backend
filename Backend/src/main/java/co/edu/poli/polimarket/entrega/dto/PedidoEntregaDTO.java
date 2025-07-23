package co.edu.poli.polimarket.entrega.dto;

public class PedidoEntregaDTO {
	
	private Long idVenta;
	private String productos;
	private String direccion;

	public PedidoEntregaDTO() {
	}

	public PedidoEntregaDTO(Long idVenta, String productos, String direccion) {
		this.idVenta = idVenta;
		this.productos = productos;
		this.direccion = direccion;
	}

	public Long getIdVenta() {
		return idVenta;
	}

	public void setIdVenta(Long idVenta) {
		this.idVenta = idVenta;
	}

	public String getProductos() {
		return productos;
	}

	public void setProductos(String productos) {
		this.productos = productos;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
}