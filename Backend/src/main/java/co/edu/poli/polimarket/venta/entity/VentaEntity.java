package co.edu.poli.polimarket.venta.entity;

import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ventas")
public class VentaEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private LocalDate fechaVenta;
	private String listaProductos;
	private String direccionEntrega;
	private String estado;

	public VentaEntity() {
	}

	public VentaEntity(Long id, LocalDate fechaVenta, String listaProductos, String direccionEntrega, String estado) {
		this.id = id;
		this.fechaVenta = fechaVenta;
		this.listaProductos = listaProductos;
		this.direccionEntrega = direccionEntrega;
		this.estado = estado;
	}

	// Getters y Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getFechaVenta() {
		return fechaVenta;
	}

	public void setFechaVenta(LocalDate fechaVenta) {
		this.fechaVenta = fechaVenta;
	}

	public String getListaProductos() {
		return listaProductos;
	}

	public void setListaProductos(String listaProductos) {
		this.listaProductos = listaProductos;
	}

	public String getDireccionEntrega() {
		return direccionEntrega;
	}

	public void setDireccionEntrega(String direccionEntrega) {
		this.direccionEntrega = direccionEntrega;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		VentaEntity that = (VentaEntity) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}