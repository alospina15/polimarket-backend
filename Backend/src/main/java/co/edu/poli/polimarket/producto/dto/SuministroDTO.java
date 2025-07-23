package co.edu.poli.polimarket.producto.dto;

public class SuministroDTO {
	
	private int cantidadSuministrada;

	public SuministroDTO() {
	}

	public SuministroDTO(int cantidadSuministrada) {
		this.cantidadSuministrada = cantidadSuministrada;
	}

	public int getCantidadSuministrada() {
		return cantidadSuministrada;
	}

	public void setCantidadSuministrada(int cantidadSuministrada) {
		this.cantidadSuministrada = cantidadSuministrada;
	}
}