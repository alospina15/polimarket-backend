package co.edu.poli.polimarket.autorizacion.dto;

public class VendedorDTO {

	private Long id;
	private String nombre;
	private boolean autorizado;

	public VendedorDTO(Long id, String nombre, boolean autorizado) {
		this.id = id;
		this.nombre = nombre;
		this.autorizado = autorizado;
	}

	public Long getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}

	public boolean isAutorizado() {
		return autorizado;
	}

}
