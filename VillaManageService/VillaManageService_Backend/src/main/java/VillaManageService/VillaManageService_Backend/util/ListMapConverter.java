package VillaManageService.VillaManageService_Backend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.Map;

@Converter
public class ListMapConverter implements AttributeConverter<ArrayList<Map<String, Object>>, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(ArrayList<Map<String, Object>> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ArrayList<Map<String, Object>> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, new TypeReference<ArrayList<Map<String, Object>>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}