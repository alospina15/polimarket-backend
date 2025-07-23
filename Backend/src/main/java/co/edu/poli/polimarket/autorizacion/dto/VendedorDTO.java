package co.edu.poli.polimarket.autorizacion.dto;

public class VendedorDTO {

	private Long id;
	private String nombre;
	private Boolean autorizado;

	public VendedorDTO(Long id, String nombre, boolean autorizado) {
		this.id = id;
		this.nombre = nombre;
		this.autorizado = autorizado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public boolean isAutorizado() {
		return autorizado;
	}

	public void setAutorizado(boolean autorizado) {
		this.autorizado = autorizado;
	}

}
