package co.edu.poli.polimarket.producto.entity;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class ProductoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String nombre;
	private String descripcion;
	private int cantidadDisponible;

	public ProductoEntity() {
	}

	public ProductoEntity(Long id, String nombre, String descripcion, int cantidadDisponible) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.cantidadDisponible = cantidadDisponible;
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

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getCantidadDisponible() {
		return cantidadDisponible;
	}

	public void setCantidadDisponible(int cantidadDisponible) {
		this.cantidadDisponible = cantidadDisponible;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProductoEntity that = (ProductoEntity) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public String toString() {
		return "ProductoEntity{" + "id=" + id + ", nombre='" + nombre + '\'' + ", cantidadDisponible="
				+ cantidadDisponible + '}';
	}
}