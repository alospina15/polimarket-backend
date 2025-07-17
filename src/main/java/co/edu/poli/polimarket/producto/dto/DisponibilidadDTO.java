package co.edu.poli.polimarket.producto.dto;

public class DisponibilidadDTO {
	private Long idProducto;
	private String nombreProducto;
	private int cantidadDisponible;

	public DisponibilidadDTO() {
	}

	public DisponibilidadDTO(Long idProducto, String nombreProducto, int cantidadDisponible) {
		this.idProducto = idProducto;
		this.nombreProducto = nombreProducto;
		this.cantidadDisponible = cantidadDisponible;
	}

	public Long getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(Long idProducto) {
		this.idProducto = idProducto;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public int getCantidadDisponible() {
		return cantidadDisponible;
	}

	public void setCantidadDisponible(int cantidadDisponible) {
		this.cantidadDisponible = cantidadDisponible;
	}
}