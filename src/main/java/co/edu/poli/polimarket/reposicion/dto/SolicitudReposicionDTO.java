package co.edu.poli.polimarket.reposicion.dto;

public class SolicitudReposicionDTO {
	
	private Long idProducto;
	private Long idProveedor;
	private int cantidad;

	public SolicitudReposicionDTO() {
	}

	public SolicitudReposicionDTO(Long idProducto, Long idProveedor, int cantidad) {
		this.idProducto = idProducto;
		this.idProveedor = idProveedor;
		this.cantidad = cantidad;
	}

	public Long getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}

	public Long getIdProveedor() {
		return idProveedor;
	}

	public void setIdProveedor(Long idProveedor) {
		this.idProveedor = idProveedor;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}
}