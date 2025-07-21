package co.edu.poli.polimarket.autorizacion.service.iml;

import org.springframework.stereotype.Service;

import co.edu.poli.polimarket.autorizacion.dto.VendedorDTO;
import co.edu.poli.polimarket.autorizacion.entity.VendedorEntity;
import co.edu.poli.polimarket.autorizacion.repository.VendedorRepository;
import co.edu.poli.polimarket.autorizacion.service.AutorizacionService;
import co.edu.poli.polimarket.util.ResourceNotFoundException;

@Service
public class AutorizacionServiceImpl implements AutorizacionService {
    @Override
    public VendedorDTO autorizarVendedor(Long vendedorId, boolean autorizar) {
        // Usar la lista mock de VendedorController
        co.edu.poli.polimarket.autorizacion.dto.VendedorDTO vendedor =
            co.edu.poli.polimarket.autorizacion.controller.VendedorController.vendedores.stream()
                .filter(v -> v.getId().equals(vendedorId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Vendedor no encontrado con id: " + vendedorId));
        // Ahora que existe setAutorizado, modificamos el objeto directamente
        vendedor.setAutorizado(autorizar);
        return vendedor;
    }
}

