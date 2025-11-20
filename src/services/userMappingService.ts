import apiClient from '../api/apiClient';

/**
 * Maps Keycloak ID to database ID
 * This is called after login to get the user's database ID
 */
export const getUserDatabaseId = async (keycloakId: string, role: string): Promise<number | null> => {
  try {
    if (role === 'STUDENT') {
      // Get all students and find one with matching keycloakId
      const response = await apiClient.get('/student/students');
      const students = response.data;
      const student = students.find((s: any) => s.kc_id === keycloakId);
      return student?.s_id || null;
    } else if (role === 'LECTURER') {
      // Get all lecturers and find one with matching keycloakId
      const response = await apiClient.get('/lecturer/lecturers');
      const lecturers = response.data;
      const lecturer = lecturers.find((l: any) => l.kc_id === keycloakId);
      return lecturer?.lec_id || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting database ID:', error);
    return null;
  }
};