package co.edu.poli.polimarket.reposicion.entity;

import java.time.LocalDate;
import java.util.Objects;

import co.edu.poli.polimarket.producto.entity.ProductoEntity;
import co.edu.poli.polimarket.proveedor.entity.ProveedorEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "solicitudes_reposicion")
public class SolicitudReposicionEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "id_producto", nullable = false)
	private ProductoEntity producto;

	@ManyToOne
	@JoinColumn(name = "id_proveedor", nullable = false)
	private ProveedorEntity proveedor;

	private int cantidadSolicitada;
	private LocalDate fechaSolicitud;
	private String estado;

	public SolicitudReposicionEntity() {
	}

	public SolicitudReposicionEntity(Long id, ProductoEntity producto, ProveedorEntity proveedor,
			int cantidadSolicitada, LocalDate fechaSolicitud, String estado) {
		this.id = id;
		this.producto = producto;
		this.proveedor = proveedor;
		this.cantidadSolicitada = cantidadSolicitada;
		this.fechaSolicitud = fechaSolicitud;
		this.estado = estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ProductoEntity getProducto() {
		return producto;
	}

	public void setProducto(ProductoEntity producto) {
		this.producto = producto;
	}

	public ProveedorEntity getProveedor() {
		return proveedor;
	}

	public void setProveedor(ProveedorEntity proveedor) {
		this.proveedor = proveedor;
	}

	public int getCantidadSolicitada() {
		return cantidadSolicitada;
	}

	public void setCantidadSolicitada(int cantidadSolicitada) {
		this.cantidadSolicitada = cantidadSolicitada;
	}

	public LocalDate getFechaSolicitud() {
		return fechaSolicitud;
	}

	public void setFechaSolicitud(LocalDate fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
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
		SolicitudReposicionEntity that = (SolicitudReposicionEntity) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}